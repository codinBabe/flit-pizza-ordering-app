'use client'
import DishCard from "@/components/DishCard";
import { useEffect, useState } from "react"

export default function ProductPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories));
        });

        fetch('/api/menu').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems));
        });
    }, [])

    return (
        <main className="p-8 md:p-12">
            {categories?.length > 0 && categories.map(c => (
                <div>
                    <div className="text-center">
                        <h2 className="font-semibold text-4xl">{c.name}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-12">
                        {menuItems.filter(m => m.category === c._id).map(item => (
                            <DishCard {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    )
}