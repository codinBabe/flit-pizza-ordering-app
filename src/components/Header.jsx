'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

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
                <FaBars className='cursor-pointer' onClick={toggleMobileNav} />
            </div>
            <nav className={`${isMobileNavOpen ? 'right-0' : 'right-full'} lg:hidden fixed top-0 bg-white z-50 w-2/3 h-full transition-transform transform ease-in-out duration-300`}>
                <div className='flex items-center justify-between px-4 py-3'>
                    <FaTimes className='cursor-pointer' onClick={toggleMobileNav} />
                </div>
                <div className='flex flex-col items-center'>
                    <Link href={'/'} className='py-2'>HOME</Link>
                    <Link href={'/products'} className='py-2'>PRODUCTS</Link>
                    <Link href={'/blog'} className='py-2'>BLOG</Link>
                    <Link href={'/contact'} className='py-2'>CONTACT</Link>
                    {status === 'authenticated' && (
                        <>
                            <Link href={'/profile'} className="py-2 whitespace-nowrap">
                                Hello, {userName}
                            </Link>
                            <button onClick={() => signOut()}>LOGOUT</button>
                        </>
                    )}
                    {status === 'unauthenticated' && (
                        <Link href={'/login'} className='py-2'>LOGIN</Link>
                    )}
                </div>
            </nav>
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
    );
}
