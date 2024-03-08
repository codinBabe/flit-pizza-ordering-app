'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import Image from "next/image"
import { useContext } from "react"
import { FaRegTrashAlt } from "react-icons/fa"

export default function CartPage() {
    const { cartItems, removeCartItem } = useContext(CartContext);
    let total = 0;
    for (const p of cartItems) {
        total += cartProductPrice(p);
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
                        <div key={index} className="flex flex-col md:flex-row items-center md:items-start gap-4 md:mb-2 border-b py-2">
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
                    <div className="py-4 text-right">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-lg font-semibold pl-2">${total}</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold">Checkout</h2>
                </div>
            </div>
        </main>
    )
}