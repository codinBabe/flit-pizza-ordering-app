'use client'
import { useEffect, useState } from "react";
import DishCard from "./DishCard";

export default function Dish() {
    const [popularDishes, setPopularDishes] = useState([]);

    useEffect(() => {
        fetch('/api/menu').then(res => {
            res.json().then(products => {
                setPopularDishes(products.slice(-3));
            })
        })
    }, [])
    return (
        <section id="menu" className='p-8'>
            <div className="mb-10">
                <h3 className="text-primary_text_red font-medium text-xl mb-1">Popular Dishes</h3>
                <h1 className="font-semibold text-3xl">Browse our Menu</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {popularDishes?.length > 0 && popularDishes.map((dish) => (
                    <DishCard {...dish} />
                ))}
            </div>
        </section>
    )
}