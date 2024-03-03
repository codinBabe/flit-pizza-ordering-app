"use client"
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import MenuForm from "@/components/MenuForm";

export default function NewMenu() {
    const [redirectToMenu, setRedirectToMenu] = useState(false);
    const { loading, data } = useProfile();

    async function handleFormSubmit(e, data) {
        e.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve()
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving tasty item...',
            success: 'Saved',
            error: 'Error saving item',
        });
        setRedirectToMenu(true);
    }

    if (redirectToMenu) {
        return redirect('/menu')
    }
    if (loading) {
        return 'Loading...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <main className="my-8">
            <ProfileTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu'} className="button text-center border rounded-md">Show all menu</Link>
            </div>
            <MenuForm menu={null} onSubmit={handleFormSubmit} />
        </main>
    )
}