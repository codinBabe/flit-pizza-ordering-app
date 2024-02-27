"use client"
import EditableImage from "@/components/EditableImage";
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenu(){
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [redirectToMenu, setRedirectToMenu] = useState(false);
    const { loading, data } = useProfile();
    

    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = { image, name, description, price };
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve()
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving tasty item...',
            success: 'Saved',
            error: 'Error saving item',
        });
        setRedirectToMenu(true);
    }

    if (redirectToMenu){
        return redirect('/menu')
    }
    if (loading){
        return 'Loading...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }

    return(
        <main className="my-8">
            <ProfileTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu'} className="button">Show all menu</Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4"
                    style={{ gridTemplateColumns: '.3fr .7fr' }}>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        <label>Description</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                        <label>Price</label>
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
                        <button className="" type="submit">Create</button>
                    </div>
                </div>
            </form>
        </main>
    )
}