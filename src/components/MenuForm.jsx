import EditableImage from "@/components/EditableImage";
import { useEffect, useState } from "react";
import MenuPriceProps from "./MenuPriceProps";

export default function MenuForm({ onSubmit, menu }) {

    const [image, setImage] = useState(menu?.image || '');
    const [name, setName] = useState(menu?.name || '');
    const [rating, setRating] = useState(menu?.rating || '');
    const [description, setDescription] = useState(menu?.description || '');
    const [price, setPrice] = useState(menu?.price || '');
    const [sizes, setSizes] = useState(menu?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menu?.extraIngredientPrices || []);
    const [category, setCategory] = useState(menu?.category || null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }, []);


    return (
        <form
            onSubmit={e => onSubmit(e, { image, name, rating, description, price, sizes, extraIngredientPrices, category })
            }
            className="mt-8 max-w-md mx-auto">
            <div className="md:grid items-start gap-4"
                style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label>Rating</label>
                    <input
                        type="text"
                        value={rating}
                        onChange={e => setRating(e.target.value)} />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Select category</option>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)} />
                    <MenuPriceProps
                        name={'Size'}
                        addLabel={'Add size item'}
                        props={sizes}
                        setProps={setSizes} />
                    <MenuPriceProps
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices} />
                    <button className="bg-primarybtn text-white rounded-md" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}