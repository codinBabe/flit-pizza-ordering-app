import ProfileTabs from "@/components/ProfileTabs";
import { useEffect, useState } from "react";

export default function Categories(){
    const [isAdmin, setIsAdmin] = useState('');
    useEffect(()=>{
        fetch('/api/profile').then(response=>{
            response.json().then(data=>{
                setIsAdmin(data.admin);
            });
        })
    }, [])
    return(
        <main>
            Categories
            <ProfileTabs isAdmin={true}/>
        </main>
    )
}