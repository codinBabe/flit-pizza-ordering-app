"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Profile() {
    const session = useSession();
    const { status } = session;
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName }),
        });
        setIsSaving(false);
        if (response.ok) {
            setSaved(true)
        }
    }
    async function handlePicChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.append('file', files[0]);
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: data,
                });
                if (!response.ok) {
                    throw new Error('Failed to upload image');
                } else {
                    const link = await response.json();
                    console.log(link);
                    setImage(link);
                }
            } catch (error) {
                setError('Error uploading image');
            }
        }
    }

    if (status === "loading") {
        return 'Loading...';
    }
    if (status === "unauthenticated") {
        return redirect('/login');
    }
    return (
        <main className="my-8">
            <h1 className="text-center text-4xl mb-4">Profile</h1>

            <div className="max-w-md mx-auto">
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border border-blue-300">Saving...</h2>
                )}
                {saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">Profile saved!</h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative">
                            {image && (
                                <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt={'avatar'} />
                            )}

                            <label>
                                <input type="file" className="hidden" onChange={handlePicChange} />
                                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="Enter your Full Name" value={userName} onChange={e => setUserName(e.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <button type="submit" className="bg-primarybtn text-white rounded-md">Save</button>
                    </form>
                </div>
            </div>
        </main>
    )
}