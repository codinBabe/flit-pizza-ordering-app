import Image from 'next/image';
import ReviewCard from './ReviewCard';
import { customerReview } from './utils/CustomerReview';

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
    )
}