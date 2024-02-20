import React from 'react';
import Link from 'next/link';
export default function Footer() {
    return (
        <footer className='flex items-start flex-col gap-5 mx-auto bg-primarybg p-8 lg:gap-4 lg:justify-between lg:flex-row'>
            <div>
                <h2 className='font-semibold text-lg'>INFORMATION</h2>
                <div className='flex flex-col gap-3 font-medium text-primary_text_grey text-base mt-3'>
                    <Link href={''}>Home</Link>
                    <Link href={''}>Blog</Link>
                    <Link href={''}>About Us</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>Contact Us</Link>
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-lg'>TOP ITEMS</h2>
                <div className='flex flex-col gap-3 text-primary_text_grey font-medium text-base mt-3'>
                    <Link href={''}>Pepperoni</Link>
                    <Link href={''}>Swiss Mushroom</Link>
                    <Link href={''}>Barbeque Chicken</Link>
                    <Link href={''}>Vegetarian</Link>
                    <Link href={''}>Ham & Cheese</Link>
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-lg'>OTHERS</h2>
                <div className='flex flex-col gap-3 text-primary_text_grey font-medium text-base mt-3'>
                    <Link href={''}>Checkout</Link>
                    <Link href={''}>Cart</Link>
                    <Link href={''}>Product</Link>
                    <Link href={''}>Locations</Link>
                    <Link href={''}>Legal</Link>
                </div>
            </div>
            <div>
                <h2 className='font-semibold text-lg'>SOCIAL MEDIA</h2>
                <div className='flex items-center font-medium gap-3 text-base mt-2'>
                    <a href="https://www.facebook.com/pizzon/" target="_blank" rel="noreferrer">
                        <img src="/facebook-icon.png" alt="facebook icon" width="38px" />
                    </a>
                    <a href='#'><img src="/pinterest-icon.jpg" alt="pinterest icon" width="40px" /></a>
                    <a href='#'><img src="/twitter-icon.png" alt="twitter icon" width="42px" /></a>
                    <a href="https://www.instagram.com/pizzon_/" target="_blank" rel="noreferrer">
                        <img src="/instagram-icon.jpg" alt="instagram icon" width="40px" />
                    </a>
                </div>
                <p className='text-gray-500 text-sm font-medium my-4'>Sign up and get exclusive offers and coupon codes</p>
                <Link href={'/signup'} className='text-white bg-primarybtn py-2 px-6 rounded-full'>SIGN UP</Link>
            </div>
        </footer>
    )
}
