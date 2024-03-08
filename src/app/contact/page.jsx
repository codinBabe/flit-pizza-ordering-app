export default function ContactPage() {
    return (
        <main className="p-8 md:p-12 text-center">
            <h1 className="font-semibold text-3xl animate-fade-in mb-8">Visit or <span className="text-primary_text_red">Contact us</span></h1>
            <div className="flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-12">
                <form method="#" className="w-full md:w-1/2 max-w-md">
                        <input type="text" name="text" placeholder="Name" />
                        <input type="email" name="email" placeholder="Email" />
                        <input type="tel" name="text" placeholder="Phone Number" />
                        <textarea name="text" placeholder="Message" cols={3} rows={8} />
                    <button className="text-white bg-primarybtn rounded-md" type="submit">SEND MESSAGE</button>
                </form>
                <div className="w-full md:w-auto">
                    <img className="transition-transform duration-300 transform hover:scale-110 max-w-full" src="/berry-pizza.png" alt="berry-pizza" width="500px" />
                </div>
            </div>
        </main>
    )
}