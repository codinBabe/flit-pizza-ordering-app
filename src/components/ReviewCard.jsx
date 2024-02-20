import Image from 'next/image';

export default function ReviewCard({ image, name, review }) {
    return (
        <div className="border bg-white rounded-lg shadow-md px-6 py-10 flex flex-col items-center gap-3">
            <Image src={image} alt={name} width={100} height={100} className='rounded-full' />
            <h3 className="text-xl font-medium">{name}</h3>
            <p>{review}</p>
        </div>
    );
}