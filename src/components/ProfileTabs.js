import { usePathname } from "next/navigation"

export default function ProfileTabs({isAdmin}){
    const path = usePathname;
    return(
        <div className="flex gap-2 justify-center tabs">
            <Link 
            className={path === '/profile' ? 'active' : ''}
            href={'/profile'}>Profile</Link>
            {isAdmin && (
                <>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/users'}>Users</Link>
                </>
            )}
        </div>
    )
}