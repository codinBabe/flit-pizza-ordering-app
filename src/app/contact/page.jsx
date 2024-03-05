export default function ContactPage() {
    return (
        <main className="p-12 text-center">
            <h1 className="font-semibold text-3xl animate-fade-in mb-8">Visit or <span className="text-primary_text_red">Contact us</span></h1>
            <div className="flex item-center gap-48">
                <form method="#" className="w-2/4">
                    <div className="">
                        <input type="text" name="text" placeholder="Name" />
                        <input type="email" name="email" placeholder="Email" />
                        <input type="text" name="text" placeholder="Phone Number" />
                        <textarea name="text" placeholder="Message" cols={3} rows={8} />
                    </div>
                    <button className="text-white bg-primarybtn p-4 rounded-md w-full" type="submit">SEND MESSAGE</button>
                </form>
                <div>
                    <img className="transition-transform duration-300 transform hover:scale-110" src="/berry-pizza.png" alt="berry-pizza" width="500px" />
                </div>
            </div>
        </main>
    )
}