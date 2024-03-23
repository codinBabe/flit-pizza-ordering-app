'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import UserDetails from "@/components/UserDetails";
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartPage() {
    const { cartItems, removeCartItem } = useContext(CartContext);
    const [details, setDetails] = useState({});
    const [showPayPal, setShowPayPal] = useState(false);
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, postalCode, city, country } = profileData;
            const detailsFromProfile = {
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            };
            setDetails(detailsFromProfile);
        }
    }, [profileData]);

    let subTotal = 0;
    for (const p of cartItems) {
        subTotal += cartProductPrice(p);
    }

    async function createOrder() {
        return fetch("/api/paypal/createorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                details,
                cartItems,
            })
        })
            .then((response) => response.json())
            .then((order) => {
                console.log(order)
                return order.id;
            });
    }

    async function onApprove(data) {
        return fetch("/api/paypal/captureorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID,
            }),
        })
            .then((response) => response.json())
            .then((orderData) => {
                // Your code here after capture the order
                console.log(orderData);
            });
    }

    function handleDetailsChange(propName, value) {
        setDetails(prevDetails => {
            return { ...prevDetails, [propName]: value };
        })
    }

    const ButtonWrapper = ({ showSpinner }) => {
        const [{ isPending }] = usePayPalScriptReducer();

        return (
            <>
                {(showSpinner && isPending) && <div className="spinner" />}
                <PayPalButtons
                    disabled={false}
                    fundingSource={undefined}
                    Order={createOrder}
                    Approve={onApprove}
                />
            </>
        );
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
                            Subtotal:<br />
                            Delivery:<br />
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
                    <div>
                        <UserDetails
                            detailsProps={details}
                            setDetailsProps={handleDetailsChange}
                        />
                        {showPayPal ? (
                            <PayPalScriptProvider
                                options={{
                                    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "credit,card,p24"
                                }}>
                                <ButtonWrapper showSpinner={false} />
                            </PayPalScriptProvider>
                        ) : (
                            <button
                                onClick={() => setShowPayPal(true)}
                                type="button"
                                className="button rounded-md bg-primarybtn text-white"
                            >Pay ${subTotal + 5}</button>
                        )}

                    </div>
                </div>
            </div>
        </main>
    )
}