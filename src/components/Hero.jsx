import Image from 'next/image';
import { FaShoppingCart } from "react-icons/fa";
import pizza from '../../public/images/berry-pizza.png';
import pizza2 from '../../public/images/pizza2.png';
import garlic from '../../public/images/garlic.png';
import onion from '../../public/images/pizza-onion.png';
import slicedpizza from '../../public/images/slicedpizza.png';
import Link from 'next/link';
export default function Hero() {
    return (
        <section className='p-8'>
            <div>
                <h1 className='text-5xl font-semibold my-5 leading-tight
                '>Handmade,<br />
                    With an Extra <br />
                    Pinch of <span className='text-primary_text_red'>Love</span>
                </h1>
                <p className='text-2xl leading-normal m-0'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <Link href={'/products'} className='flex item-center justify-center gap-2 bg-primarybtn rounded-full py-3 px-6 text-white text-center my-8 max-w-md'><FaShoppingCart className='mt-1' /> ORDER NOW</Link>
            </div>
            <div>
                <Image className='hidden lg:'
                    src={pizza}
                    alt='pizza'
                />
            </div>
            <div>
                <Image className='hidden lg:'
                    src={onion}
                    alt='onion'
                />
                <Image className='hidden lg:'
                    src={pizza2}
                    alt='pizza2' />
            </div>
            <div className='my-12'>
                <Image
                    src={slicedpizza}
                    alt='sliced-pizza'
                />
            </div>
            <div>
                <h2 className='text-3xl font-semibold mt-5 leading-normal'>Daily fresh and always tasty</h2>
                <div className='flex gap-1 items-center'>
                    <p className='text-base leading-loose'>There are many variations of passages of Lorem Ipsum available, but the majority have</p>
                    <Image
                        src={garlic}
                        alt='garlic'
                        width={60}
                        height={40}
                    />
                </div>
            </div>
        </section>
    );
}