import Image from "next/image";
import Best_Taste from "../../public/images/best-taste.png";
import All_Food from "../../public/images/all-kinds-of-foods.png";
import On_Time from "../../public/images/on-time-delivery.png";
import Fresh_Food from "../../public/images/fresh-foods.png";
import Sliced_pizza from "../../public/images/half-pizza.png";
export default function AboutUs() {
    return (
        <section className="bg-primarybg p-8 mt-8">
            <div className="flex items-center justify-between">
                <div className="self-start">
                    <h3 className="text-primary_text_red font-medium text-xl mb-1">Our Strength</h3>
                    <h1 className="font-semibold text-3xl">Why We Are The Best</h1>
                </div>
                <Image className=""
                    src={Sliced_pizza}
                    alt="half-pizza"
                    width={300}
                    height={100}
                />
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:-mt-20">
                <div className="flex flex-col gap-3">
                    <Image
                        src={All_Food}
                        alt="all-kinds-of-foods"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">All Kinds of Foods</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <Image
                        src={Fresh_Food}
                        alt="fresh-food"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">Fresh food Always</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Image
                        src={Best_Taste}
                        alt="Best"
                        width={30}
                        height={30}
                    />
                    <h3 className="font-semibold">Best taste of food</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Image
                        src={On_Time}
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