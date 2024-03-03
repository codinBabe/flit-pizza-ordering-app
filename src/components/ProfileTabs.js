"use client"
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function ProfileTabs({ isAdmin }) {
    const path = usePathname();
    return (
        <div className="tabs flex mx-auto gap-2 justify-center flex-wrap">
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
                        className={/menu/.test(path) ? 'active' : ''}>
                        Menu
                    </Link>
                    <Link
                        href={'/users'}
                        className={path.includes('/users') ? 'active' : ''}>
                        Users
                    </Link>
                    <Link
                        href={'/orders'}
                        className={path === '/orders' ? 'active' : ''}>
                        Orders
                    </Link>
                </>
            )}
        </div>
    )
}