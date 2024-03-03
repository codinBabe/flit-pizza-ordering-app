"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import ProfileTabs from "@/components/ProfileTabs";
import toast from "react-hot-toast";
import UserForm from "@/components/UserForm";

export default function Profile() {
    const session = useSession();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e, data) {
        e.preventDefault();

        const savingpromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingpromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error saving profile'
        })
    }
    if (status === "loading" || !profileFetched) {
        return 'Loading...';
    }
    if (status === "unauthenticated") {
        return redirect('/login');
    }
    return (
        <main className="my-8">
            <ProfileTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-8">
               <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </main>
    )
}