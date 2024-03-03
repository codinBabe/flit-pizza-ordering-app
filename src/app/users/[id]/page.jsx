"use client"
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile"
import UserForm from "@/components/UserForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const { loading, data } = useProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user);
            });
        })
    }, []);

    async function handleSaveButtonClick(e, data) {
        e.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify({ ...data, _id: id }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading:'Updating...',
            success:'User info saved successfully',
            error: 'An error occurred while saving'
        })
    }

    if (loading) {
        return 'Loading...';
    }
    if (!data.admin) {
        return 'You are not an admin';
    }

    return (
        <main className="max-w-md mx-auto my-8">
            <ProfileTabs isAdmin={true} />
            <div>
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </main>
    )
}