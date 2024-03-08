"use client"
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuForm from "@/components/MenuForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenu() {

    const { id } = useParams();
    const [menu, setMenu] = useState(null);
    const [redirectToMenu, setRedirectToMenu] = useState(false);
    const { loading, data } = useProfile();


    useEffect(() => {
        fetch('/api/menu').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenu(item);
            });
        })
    }, [])

    async function handleFormSubmit(e, data) {
        e.preventDefault();
        data = { ...data, _id: id };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu', {
                method: 'PUT',
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
    async function handleDeleteClick() {
        const deletePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu?_id=' + id, {
                method: 'DELETE',
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        setRedirectToMenu(true);
        await toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: 'Deleted successfully',
            error: 'Could not delete menu'
        });

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
        <main className="p-3 md:p-8">
            <ProfileTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu'} className="button text-center border rounded-md">Show all menu</Link>
            </div>
            <MenuForm menu={menu} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton
                        label={'Delete'}
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </main>
    )
}