'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import UserDetails from "@/components/UserDetails";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartPage() {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const [details, setDetails] = useState({});
    const [showPayPal, setShowPayPal] = useState(false);
    const {data:profileData} = useProfile();

    useEffect(()=>{
        if (profileData?.city){
            const {phone, streetAddress, postalCode, city, country} = profileData;
            const detailsFromProfile = {
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            };
            setDetails(detailsFromProfile);
        }
    },[profileData]);

    let subTotal = 0;
    for (const p of cartItems) {
        subTotal += cartProductPrice(p);
    }

    async function proceedToCheckout(e){
        e.preventDefault();
        const response = await fetch('/api/checkout',{
            method: 'POST',
            headers:{'Content-Type:': 'application/json'},
            body: JSON.stringify({
                details,
                cartItems,
            })
        });
        // const link = await response.json();
        // window.location = link;
    }

    function handleDetailsChange(propName, value) {
        setDetails(prevDetails=>{
            return {...prevDetails, [propName]: value};
        })
    }
    return (
        <main className="p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
            <h1 className="font-semibold text-2xl md:text-4xl text-center mb-8">Checkout</h1>
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    {cartItems?.length === 0 && (
                        <div className="text-center">No products in your shopping cart</div>
                    )}
                    {cartItems?.length > 0 && cartItems.map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b py-4">
                            <div className="w-24 md:w-32">
                                <Image width={240} height={240} src={product.image} alt="avatar" />
                            </div>
                            <div className="md:grow">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm">
                                        Size: <span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map((extra, index) => (
                                            <div key={index}>{extra.name} ${extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-lg font-semibold md:ml-auto">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="md:ml-2 mt-2 md:mt-0">
                                <button
                                    onClick={() => removeCartItem(index)}
                                    className="p-2"
                                    type="button">
                                    <FaRegTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="py-2 flex justify-end items-center">
                        <div className="text-gray-500">
                        Subtotal:<br/>
                        Delivery:<br/>
                        Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            ${subTotal}<br />
                            $5<br />
                        ${subTotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold">Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                    <UserDetails
                        detailsProps={details}
                        setDetailsProps={handleDetailsChange}
                    />
                        <button
                        type="submit"
                        className="button rounded-md bg-primarybtn text-white"
                        >Pay ${subTotal + 5}</button>

                    </form>
                </div>
            </div>
        </main>
    )
}