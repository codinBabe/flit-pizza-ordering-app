"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            setUserCreated(true);
        } else {
            setError(true);
        }
        setCreatingUser(false);
    }
    return (
        <main className="p-10 mx-auto max-w-md text-center">
            <h1 className="font-semibold text-3xl animate-fade-in">Sign Up</h1>
            {userCreated && (
                <div className="text-center mt-4">
                    Your account has been created!<br />
                    Now you can {' '} <Link className="underline" href={'/login'}>Login</Link>
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center mt-4">
                    Something went wrong. Please try again.
                </div>
            )}
            <form className="my-1" onSubmit={handleFormSubmit}>
                <input type="text" value={name} placeholder="Enter your full name" disabled={creatingUser}
                    onChange={e => setName( e.target.value)}
                />
                <input type="email" value={email} placeholder="Email" disabled={creatingUser}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" disabled={creatingUser}
                    onChange={e => setPassword(e.target.value)} />
                <button className='text-white bg-primarybtn p-4 rounded-md w-full' type='submit' disabled={creatingUser}>Submit</button>
                <div className="flex items-center justify-center my-5">
                    <hr className="flex-grow border-t border-gray-300 mr-3" />
                    <p className="inline-block bg-white px-3 text-gray-600">or</p>
                    <hr className="flex-grow border-t border-gray-300 ml-3" />
                </div>
                <div className="flex items-center justify-center gap-2 my-6">
                    <p className="text-sm font-medium">Already have an account? </p>
                    <Link className="bg-gradient-to-r from-yellow-500 to-red-500 animate-gradient text-white font-bold py-2 px-4 rounded" href={'/login'}>Login</Link>
                </div>
                <button type='button'
                    onClick={() => signIn('google', { callbackUrl: '/' })} className="text-black flex justify-center items-center gap-2 mt-5 border">
                    <img src='/google-icon.png' alt='google-icon' width={30} />
                    Sign Up with goggle
                </button>
            </form>
        </main>
    )
}
