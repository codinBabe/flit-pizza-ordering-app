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
        <main className="my-8 max-w-md mx-auto">
            <ProfileTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu/new'}>Create new menu</Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3">
                    {menu?.length > 0 && menu.map(item => (
                        <Link href={'/menu/edit/' + item._id} className="mb-1 button flex-col">
                            <div className="relative">
                                <Image src={item.image} alt={''} width={100} height={100} />
                            </div>
                            {item.name}
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    )
}