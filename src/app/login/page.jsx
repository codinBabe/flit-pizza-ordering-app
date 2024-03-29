"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', { email, password, callbackUrl: '/' });
        setLoginInProgress(false);
    }
    return (
        <main className="p-8 md:p-12 mx-auto max-w-md text-center">
            <h1 className="font-semibold text-3xl animate-fade-in">Login</h1>

            <form className="my-1" onSubmit={handleFormSubmit}>
                <input type="email" value={email} name="email" placeholder="Email"
                    onChange={e => setEmail(e.target.value)} disabled={loginInProgress} />
                <input type="password" value={password} name="password" placeholder="Password"
                    onChange={e => setPassword(e.target.value)} disabled={loginInProgress} />
                <button type='submit' disabled={loginInProgress} className='text-white bg-primarybtn rounded-md'>Login</button>
                <div className="flex items-center justify-center my-5">
                    <hr className="flex-grow border-t border-gray-300 mr-3" />
                    <p className="inline-block bg-white px-3 text-gray-600">or</p>
                    <hr className="flex-grow border-t border-gray-300 ml-3" />
                </div>
                <div className="flex items-center justify-center gap-2 my-6">
                    <p className="text-sm font-medium">Don't have an account? </p>
                    <Link className="bg-gradient-to-r from-yellow-500 to-red-500 animate-gradient text-white font-bold p-2 rounded" href={'/signup'}>Sign Up</Link>
                </div>
                <button type='button' onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="text-black flex justify-center items-center gap-2 mt-5 border rounded-md">
                    <img src="/google-icon.png" alt="goggle icon" width={30} /> Login with goggle
                </button>
            </form>
        </main>
    )
}
