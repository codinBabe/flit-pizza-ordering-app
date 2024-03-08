import { BlogData } from "@/components/utils/Blog";

export default function BlogPage() {
    return (
        <main className="p-8 md:p-12"> 
            {BlogData.map((item, index) => (
                <div key={item.id} 
                    className={`flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}> 
                    <div className="w-full md:w-2/4 flex flex-col gap-3 leading-loose">
                        <h1 className="font-semibold text-3xl">{item.title}</h1>
                        <time className="text-primary_text_grey">{item.time}</time>
                        <p className="text-medium">{item.description}</p>
                    </div>
                    <img
                        className="transition-transform duration-300 transform hover:scale-110 rounded-lg w-full md:w-auto max-w-lg"
                        src={item.image}
                        alt="avatar"
                    />
                </div>
            ))}
        </main>
    );
}
