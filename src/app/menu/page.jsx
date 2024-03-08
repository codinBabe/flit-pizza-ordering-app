"use client"
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Menu() {

    const [menu, setMenu] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu').then(res => {
            res.json().then(menu => setMenu(menu));
        });
    }, [])

    if (loading) {
        return 'Loading...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }
    return (
        <main className="p-3 md:p-8 max-w-md mx-auto">
            <ProfileTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu/new'}
                    className="button text-center border rounded-md">Create new menu</Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menu?.length > 0 && menu.map(item => (
                        <Link key={item._id} 
                        href={'/menu/edit/' + item._id} className="bg-gray-100 rounded-lg p-4">
                            <div className="relative">
                                <img src={item.image} alt={''} width={200} height={200} />
                            </div>
                            <div className="text-center font-semibold">
                                {item.name}
                            </div>
                           
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    )
}