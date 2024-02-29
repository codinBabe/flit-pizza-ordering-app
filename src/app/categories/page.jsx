"use client"
import DeleteButton from "@/components/DeleteButton";
import ProfileTabs from "@/components/ProfileTabs";
import { useProfile } from "@/components/UseProfile";
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
            if (editedCategory) {
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
    async function handleDeleteClick(_id) {
        const deletePromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: 'Deleted successfully',
            error: 'Could not delete category'
        });
        fetchCategories();

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
                            {editedCategory ? 'Update category:' : 'New category name:'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="bg-primarybtn rounded-md text-white"
                            type="submit">{editedCategory ? 'Edit' : 'Add'}</button>
                        <button type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>Cancel</button>
                    </div>
                </div>

            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">
                            <span>{c.name}</span>
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}> Edit</button>
                            <DeleteButton label={'Delete'}
                                onDelete={()=>{handleDeleteClick(c._id)}}
                            />
                        </div>

                    </div>
                ))}
            </div>
        </main>
    )
}