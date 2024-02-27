"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProfileTabs from "@/components/ProfileTabs";
import toast from "react-hot-toast";

export default function Profile() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    console.log(data);
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();

        const savingpromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: userName,
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country
                }),
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingpromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error saving profile'
        })
    }
    async function handlePicChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData();
            data.append('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(async (response) => {
                if (response.ok) {
                    const link = await response.json();
                    setImage(link);
                }
                throw new Error('Something went wrong');
            });
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete!',
                error: 'Upload failed',
            });
        }
    }

    if (status === "loading" || !profileFetched) {
        return 'Loading...';
    }
    if (status === "unauthenticated") {
        return redirect('/login');
    }
    return (
        <main className="my-8">
            <ProfileTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
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
                        <label>First and Last name</label>
                        <input type="text" placeholder="Enter your Full Name" value={userName} onChange={e => setUserName(e.target.value)} />
                        <label>Email</label>
                        <input type="email" disabled={true} value={session.data.user.email} placeholder={'email'} />
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Phone number"
                            value={phone} onChange={e => setPhone(e.target.value)} />
                        <label>Street Address</label>
                        <input type="text" placeholder="Street address"
                            value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <div className="flex gap-2">
                            <div>
                                <label>Postal Code</label>
                                <input
                                    type="text" placeholder="Postal code"
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)} />
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                    type="text" placeholder="City"
                                    value={city}
                                    onChange={e => setCity(e.target.value)} />
                            </div>
                        </div>
                        <label>Country</label>
                        <input type="text" placeholder="Country"
                            value={country} onChange={e => setCountry(e.target.value)} />
                        <button type="submit" className="bg-primarybtn text-white rounded-md">Save</button>
                    </form>
                </div>
            </div>
        </main>
    )
}