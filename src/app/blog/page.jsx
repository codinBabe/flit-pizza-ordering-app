import Image from "next/image";
export default function BlogPage() {
    return (
        <main className="p-12">
            <div className="flex items-center gap-48">
                <div className="w-2/4 flex flex-col gap-3 leading-loose">
                    <h1 className="font-semibold text-3xl">Exploring Unique Pizza Toppings That Will Tantalize Your Taste Buds</h1>
                    <time className="text-primary_text_grey">10th Jan, 2024</time>
                    <p className="text-medium">Dive into the world of unconventional pizza toppings as we explore a kaleidoscope of flavors that go beyond the classic Margherita. Join us on a flavor-packed journey that promises to redefine your pizza experience and elevate your taste buds to new heights...</p>
                </div>
                <img className="transition-transform duration-300 transform hover:scale-110 rounded-lg" src="/eating-pizza.jpg" alt="eating-pizza" width="450px" />
            </div>
            <div className="flex items-center gap-48">
                <img className="transition-transform duration-300 transform hover:scale-110" src="/pizza-with-tomato.png" alt="pizza-with-tomato" width="450px" />
                <div className="w-2/4 flex flex-col gap-3 leading-loose">
                    <h1 className="font-semibold text-3xl">Crafting the Perfect Pizza: A Journey through Flavor and Artisanal Mastery</h1>
                    <time className="text-primary_text_grey">30th Dec, 2023</time>
                    <p className="text-medium">Embark on a culinary adventure as we delve into the art of crafting the perfect pizza. From selecting the finest ingredients to mastering the art of dough, discover the secrets that make our pizzas a culinary masterpiece...</p>
                </div>
            </div>
            <div className="flex items-center gap-48">
                <div className="w-2/4 flex flex-col gap-3 leading-loose">
                    <h1 className="font-semibold text-3xl">Sustainability in Every Slice: A Greener Approach to Pizza Making</h1>
                    <time className="text-primary_text_grey">24th Dec, 2023</time>
                    <p className="text-medium">Discover our commitment to sustainability as we take you behind the scenes of our eco-friendly pizza-making practices. From locally sourced ingredients to eco-conscious packaging, learn how we are making a positive impact on the planet, one delicious slice at a time...</p>
                </div>
                <img className="transition-transform duration-300 transform hover:scale-110" src="/half-pizza.png" alt="sliced pizza" width="450px" />
            </div>
        </main>
    )
}