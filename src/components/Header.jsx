'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useSession } from 'next-auth/react';
export default function Header() {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    return (
        <header className='px-6 py-3 md:px-10 md:py-3 flex items-center justify-between text-center shadow-md sticky top-0 z-50 w-full bg-white'>
            <Image className='flex items-center'
                src={'/pizza-logo.png'}
                alt='pizzon logo'
                width={70}
                height={50}
                quality={100}
            />
            <div className='flex items-center gap-5 mr-8 lg:hidden'>
                <Link href={'#'}><FaSearch /></Link>
                <Link href={'#'}><FaShoppingCart /></Link>
            </div>
            <nav className='hidden lg:flex items-center gap-6 font-semibold text-base'>
                <Link href={'/'}>HOME</Link>
                <Link href={'/products'}>PRODUCTS</Link>
                <Link href={'/blog'}>BLOG</Link>
                <Link href={'/contact'}>CONTACT</Link>
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className="whitespace-nowrap">
                            Hello, {userName}
                        </Link>
                        <button onClick={() => signOut()}>LOGOUT</button>
                    </>
                )}
                {status === 'unauthenticated' && (
                    <Link href={'/login'}>LOGIN</Link>
                )}
                <Link href={'#'}><FaSearch /></Link>
                <Link href={'#'}><FaShoppingCart /></Link>
            </nav>
        </header>
    )
}
