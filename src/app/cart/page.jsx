'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import UserDetails from "@/components/UserDetails";
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartPage() {
    const { cartItems, removeCartItem, clearCart } = useContext(CartContext);
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
        const res = await fetch('/api/checkout', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                details,
                cartItems,
            })
        });
        const result = await res.json();
        return result;
    }

    function handleDetailsChange(propName, value) {
        setDetails(prevDetails => {
            return { ...prevDetails, [propName]: value };
        })
    }

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: "USD",
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    disabled={false}
                    forceReRender={[subTotal, currency]}
                    fundingSource={undefined}
                    createOrder={async (data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: subTotal + 5,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={async function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping
                            const orderData = {
                                details: {
                                    customer: shipping.name.full_name,
                                    streetAddress: shipping.address.address_line_1,
                                },
                                cartItems,
                            };
                            createOrder(orderData)
                                .then((orderResult) => {
                                    if (orderResult.ok) {
                                        redirect(`/orders/${orderResult.body._id}`);
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error creating order:", error);
                                });
                        });
                    }}
                />
            </>
        );
    };
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
                            <>
                                <button
                                    type="button"
                                    className="bg-white rounded-md my-3"
                                >CASH ON DELIVERY</button>
                                <PayPalScriptProvider
                                    options={{
                                        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                                        components: "buttons",
                                        currency: "USD",
                                        "disable-funding": "credit,card,p24"
                                    }}>
                                    <ButtonWrapper showSpinner={false} />
                                </PayPalScriptProvider>
                            </>

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