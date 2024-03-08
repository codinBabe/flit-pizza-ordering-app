import Image from "next/image";
export default function AboutUs() {
    return (
        <section id="about" className="bg-primarybg p-8 mt-8">
            <div className="flex items-center justify-between">
                <div className="whitespace-nowrap self-start">
                    <h3 className="text-primary_text_red font-medium text-xl mb-1">Our Strength</h3>
                    <h1 className="font-semibold text-2xl">Why We Are The Best</h1>
                </div>
                <Image className=""
                    src={'/half-pizza.png'}
                    alt="half-pizza"
                    width={300}
                    height={100}
                />
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:-mt-20">
                <div className="flex flex-col gap-3">
                    <Image
                        src={'/all-kinds-of-foods.png'}
                        alt="all-kinds-of-foods"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">All Kinds of Foods</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Image
                        src={'/fresh-foods.png'}
                        alt="fresh-food"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">Fresh food Always</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Image
                        src={'/best-taste.png'}
                        alt="Best"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">Best taste of food</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Image
                        src={'/on-time-delivery.png'}
                        alt="on-time"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">On time delivery</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </section>
    )
}