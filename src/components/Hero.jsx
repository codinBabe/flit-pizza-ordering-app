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
                <p className='text-2xl leading-normal m-0 lg:w-[45%]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <Link
                    href={'/products'}
                    className='flex item-center justify-center gap-2 bg-primarybtn rounded-full py-3 px-6 my-8 text-white max-w-xs'>
                    <FaShoppingCart className='mt-1' />
                    <span>ORDER NOW</span>
                </Link>
            </div>
            <div>
                <Image className='hidden lg:block absolute right-[280px] top-[25%]'
                    src={'/berry-pizza.png'}
                    alt='pizza'
                    width={400}
                    height={300}
                />
            </div>
            <div className="hidden lg:flex relative md:w-1/2 justify-center m-auto">
                <Image
                    className="lg:block absolute bottom-[-120px] right-[200px] -z-10"
                    src={'/pizza-onion.png'}
                    alt='onion'
                    width={100}
                    height={100}
                />
                <Image
                    className="lg:block absolute bottom-[-350px] right-[-53%] -z-10"
                    src={'/yellow-img.webp'}
                    alt='yellow'
                    width={500}
                    height={400}
                />
                <Image
                    className="lg:block absolute top-[50px] right-[-100px] -z-10"
                    src={'/pizza2.png'}
                    alt='pizza2'
                    width={200}
                    height={200}
                />

            </div>
            <div className='lg:flex items-center gap-10'>
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
                    <div className='flex gap-1 lg:gap-10 items-center'>
                        <p className='text-base leading-loose lg:w-1/2'>There are many variations of passages of Lorem Ipsum available, but the majority have</p>
                        <Image
                            src={'/garlic.png'}
                            alt='garlic'
                            width={60}
                            height={40}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}