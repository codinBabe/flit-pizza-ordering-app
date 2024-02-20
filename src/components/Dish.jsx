import DishCard from "./DishCard";

const popularDishes = [
    {
        id: 1,
        name: 'Burga Pizza',
        image: '/burger.jpg',
        price: 12.99,
        rating: '⭐⭐⭐⭐⭐',
        description: 'This is a burga pizza'
    },
    {
        id: 2,
        name: 'Vegetarian Pizza',
        image: '/product3_pizza.jpg',
        price: 11.99,
        rating: '⭐⭐⭐⭐⭐',
        description: 'This is a vegetarian pizza'
    },
    {
        id: 3,
        name: 'Sandwich',
        image: '/sandwich.jpg',
        price: 20,
        rating: '⭐⭐⭐⭐⭐',
        description: 'This is a sandwich'
    },
    {
        id: 2,
        name: 'Greek Pizza',
        image: '/pizza2.png',
        price: 11.99,
        rating: '⭐⭐⭐⭐⭐',
        description: 'This is a greek pizza'
    }
];
export default function Dish() {
    return (
        <section className='p-8'>
            <div className="mb-10">
                <h3 className="text-primary_text_red font-medium text-xl mb-1">Popular Dishes</h3>
                <h1 className="font-semibold text-3xl">Browse our Menu</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {popularDishes.map((dish) => (
                    <DishCard
                        key={dish.id}
                        name={dish.name}
                        image={dish.image}
                        price={dish.price}
                        rating={dish.rating}
                        description={dish.description}
                    />
                ))}
            </div>
        </section>
    )
}