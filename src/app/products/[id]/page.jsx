export default function ProductId(){
    const { image, name, price, rating, description, sizes, extraIngredientPrices } = menuItem;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [showPopUp, setShowPopUp] = useState(false);

    function handleAddToCart() {
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopUp) {
            setShowPopUp(true);
            return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        setShowPopUp(false);
        toast.success('Added to cart!');
    }

    function handleSelectedExtrasClick(e, extra) {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras(prev => [...prev, extra]);
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extra.name);
            });
        }
    }
    return(
        <main>
            <div
                className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div
                    className=" my-8 bg-white p-2 rounded-lg max-w-md">
                    <div className="overflow-y-scroll p-2"
                        style={{ maxHeight: 'calc(100vh-120px)', marginTop: '60px' }}>
                        <Image
                            src={image}
                            alt={name}
                            width={300}
                            height={200}
                            className='mx-auto'
                        />
                        <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
                        <p className='text-sm text-center mb-2'>{description}</p>
                        {sizes?.length > 0 && (
                            <div className='py-2'>
                                <h3 className='text-center text-gray-700'>Pick your size</h3>
                                {sizes.map(size => (
                                    <label className='flex items-center gap-2 p-4 border rounded-md mb-1'>
                                        <input
                                            type="radio"
                                            onChange={() => setSelectedSize(size)}
                                            checked={selectedSize?.name == size.name}
                                            name="size" /> {size.name} ${price + size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        {extraIngredientPrices?.length > 0 && (
                            <div className='py-2'>
                                <h3 className='text-center text-gray-700'>Pick extras</h3>
                                {extraIngredientPrices.map(extra => (
                                    <label className='flex items-center gap-2 p-4 border rounded-md'>
                                        <input
                                            type="checkbox"
                                            onChange={e => handleSelectedExtrasClick(e, extra)}
                                            name={extra.name} />
                                        {extra.name} +${extra.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={handleAddToCart}
                            className='bg-primarybtn text-white sticky bottom-2'
                            type='button'>Add to cart ${selectedPrice}
                        </button>
                        <button
                            className='mt-2'
                            onClick={() => setShowPopUp(false)}>Cancel</button>
                    </div>

                </div>
            </div>
        </main>
    )
}