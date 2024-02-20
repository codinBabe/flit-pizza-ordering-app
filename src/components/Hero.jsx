import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
export default function Hero() {
    return (
        <section className='p-8'>
            <div>
                <h1 className='text-5xl w-80 font-semibold my-5 leading-tight
                '>Handmade,
                    With an Extra
                    Pinch of <span className='text-primary_text_red'>Love</span>
                </h1>
                <p className='text-2xl leading-normal m-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <Link href={'/products'} className='flex item-center justify-center gap-2 bg-primarybtn rounded-full py-3 px-6 text-white text-center my-8 max-w-md'><FaShoppingCart className='mt-1' /> ORDER NOW</Link>
            </div>
            <div>
                <Image className='hidden lg:'
                    src={'/berry-pizza.png'}
                    alt='pizza'
                    width={100}
                    height={100}
                />
            </div>
            <div>
                <Image className='hidden lg:'
                    src={'/pizza-onion.png'}
                    alt='onion'
                    width={100}
                    height={100}
                />
                <Image className='hidden lg:'
                    src={'/pizza2.png'}
                    alt='pizza2'
                    width={100}
                    height={100}
                     />
            </div>
            <div className='my-12'>
                <Image
                    src={'/sliced-pizza.png'}
                    alt='sliced-pizza'
                    width={300}
                    height={300}
                />
            </div>
            <div>
                <h2 className='text-3xl font-semibold mt-5 leading-normal'>Daily fresh and always tasty</h2>
                <div className='flex gap-1 items-center'>
                    <p className='text-base leading-loose'>There are many variations of passages of Lorem Ipsum available, but the majority have</p>
                    <Image
                        src={'/garlic.png'}
                        alt='garlic'
                        width={60}
                        height={40}
                    />
                </div>
            </div>
        </section>
    );
}