"use client"
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function ProfileTabs({ isAdmin }) {
    const path = usePathname;
    return (
        <div className="flex gap-2 justify-center tabs">
            <Link
                className={path === '/profile' ? 'active' : ''}
                href={'/profile'}>Profile</Link>
            {isAdmin && (
                <>
                    <Link
                        href={'/categories'}
                        className={path === '/categories' ? 'active' : ''}>
                        Categories
                    </Link>
                    <Link
                        href={'/menu'}
                        className={path === '/menu' ? 'active' : ''}>
                        Menu
                    </Link>
                    <Link
                        href={'/users'}
                        className={path === '/users' ? 'active' : ''}>
                        Users
                    </Link>
                </>
            )}
        </div>
    )
}