import Image from 'next/image';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';

export default function DishCard({ id, image, name, price, rating, description }) {
    return (
        <div className="border bg-white rounded-lg shadow-md p-6 transition-transform duration-300 transform hover:scale-110">
            <Link href={`/products/${id}`}>
                    <Image src={image} alt={name} width={300} height={100} />
                    <div className='flex items-center justify-between my-5'>
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <p className="text-primary_text_red font-semibold">${price}</p>
                    </div>
                    <p className='mb-4'>{rating}</p>
                    <p>{description}</p>
                    <button className='flex item-center justify-center gap-2 bg-primarybtn rounded-full my-5'>
                        <FaCartShopping className='mt-1' />
                        ORDER NOW
                    </button>
            </Link>
        </div>
    );
}
