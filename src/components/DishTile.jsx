import { FaShoppingCart } from 'react-icons/fa';
export default function DishTile({ onAddToCart, ...item }) {
    const { image, name, price, rating, description } = item;
    return (
        <div
            className="border bg-white rounded-lg shadow-md p-6 group hover:bg-primarybg hover:shadow-md hover:shadow-black/25 transition-all">
            <div className='text-center'>
                <img src={image} alt={name} className='max-h-auto max-h-40 block mx-auto' />
            </div>
            <div className='flex items-center justify-between my-5'>
                <h3 className="text-2xl font-semibold">{name}</h3>
                <p className="text-primary_text_red font-semibold">${price}</p>
            </div>
            <p className='mb-4'>{rating}</p>
            <p className='line-clamp-3'>{description}</p>
            <button
                type='button'
                onClick={onAddToCart}
                className='flex item-center justify-center gap-2 bg-primarybtn rounded-full my-5 text-white'>
                <FaShoppingCart className='mt-1' />
                <span> ORDER NOW</span>
            </button>

        </div>
    )
}