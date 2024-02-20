import Image from 'next/image';
import ReviewCard from './ReviewCard';

const customerReview = [
    {
        id: 1,
        name: 'Tarka Bowa',
        image: '/client-1.jpg',
        review: 'Lorem Ipsum is simply dummy text of the printing book. it has survived not only five centuries, but also the leap.'
    },
    {
        id: 2,
        name: 'Tarka Bowa',
        image: '/client-2.jpg',
        review: 'Lorem Ipsum is simply dummy text of the printing book. it has survived not only five centuries, but also the leap.'
    },
    {
        id: 3,
        name: 'Tarka Bowa',
        image: '/client-3.jpg',
        review: 'Lorem Ipsum is simply dummy text of the printing book. it has survived not only five centuries, but also the leap.'
    },
    {
        id: 4,
        name: 'Tarka Bowa',
        image: '/client-4.jpg',
        review: 'Lorem Ipsum is simply dummy text of the printing book. it has survived not only five centuries, but also the leap.'
    }
]
export default function Review() {
    return (
        <section className='p-8'>
            <div className="mb-10">
                <Image 
                    src={'/leaf.png'}
                    alt="leaf"
                    width={50}
                    height={50}
                />
                <h2 className="text-primary_text_red font-medium text-xl mb-1">Cutomer Feedback</h2>
                <h1 className="font-semibold text-3xl">Client Testimonials</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {customerReview.map((customer) => (
                    <ReviewCard
                        key={customer.id}
                        image={customer.image}
                        name={customer.name}
                        review={customer.review}
                    />))
                }
            </div>
        </section>
    );
}