"use client"

import ProfileTabs from "@/components/ProfileTabs"
import { useProfile } from "@/components/UseProfile"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/users').then(res => res.json())
            .then(users => {
                setUsers(users);
            })
    }, []);

    if (loading) {
        return 'Loading...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <main className="max-w-md mx-auto my-8">
            <ProfileTabs isAdmin={true} />
            <div>
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="mt-8 flex items-center bg-gray-100 p-2 rounded-md">
                        <div className="grow flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={user.image} alt="avatar" className="w-10 h-10 rounded-full" />
                                <div className="ml-2">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link
                            href={'/users/'+user._id} 
                            className="button border-2 rounded-md"
                            >Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}