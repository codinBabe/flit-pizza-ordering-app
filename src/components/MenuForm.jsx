import EditableImage from "@/components/EditableImage";
import { useState } from "react";
import MenuPriceProps from "./MenuPriceProps";

export default function MenuForm({ onSubmit, menu }) {

    const [image, setImage] = useState(menu?.image || '');
    const [name, setName] = useState(menu?.name || '');
    const [description, setDescription] = useState(menu?.description || '');
    const [price, setPrice] = useState(menu?.price || '');
    const [sizes, setSizes] = useState(menu?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menu?.extraIngredientPrices || []);


    return (
        <form
            onSubmit={e => onSubmit(e, { image, name, description, price, sizes, extraIngredientPrices })
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
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
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