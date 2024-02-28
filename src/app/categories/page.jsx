"use client"
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Categories() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])
    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);

            });
        });
    }
    async function handleCategory(e) {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating category...' : 'Creating category...',
            success: editedCategory ? 'Category updated successfully' : 'Category created successfully',
            error: 'Category creation failed'
        });

    }

    if (profileLoading) {
        return 'Loading info...'
    }
    if (!profileData.admin) {
        return 'Not an admin';
    }
    return (
        <main className="my-8 max-w-md mx-auto">
            <ProfileTabs isAdmin={true} />
            <form className="my-8" onSubmit={handleCategory}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button className="bg-primarybtn rounded-md text-white"
                        type="submit">{editedCategory ? 'Edit' : 'Add'}</button>
                    </div>
                </div>
                
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit category:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <button onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                    }}
                        className="rounded-xl p-2 px-4 flex gap-1 cursor-pointer mb-1">
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
        </main>
    )
}