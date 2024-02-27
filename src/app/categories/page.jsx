"use client"
import ProfileTabs from "@/components/ProfileTabs";
import UseProfile from "@/components/UseProfile";
import { redirect } from "next/dist/server/api-utils";


export default function Categories(){
    
    const {loading:profileLoading, data:profileData} = UseProfile();

    if (profileLoading){
        return 'Loading user info...'
    }
    if (!profileData.admin){
        return redirect('/profile');
    }
    return(
        <main className="my-8 max-w-lg mx-auto">
            <ProfileTabs isAdmin={true}/>
            Categories
        </main>
    )
}