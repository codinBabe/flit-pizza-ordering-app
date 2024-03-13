'use client'
import { useState } from "react";
import EditableImage from "@/components/EditableImage";
import { useProfile } from "./UseProfile";
import UserDetails from "./UserDetails";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleDetailsChange(propName, value) {
        if (propName === 'phone')setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="flex gap-4 mt-8">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form className="grow" onSubmit={e => onSave(e, {
                name: userName, image, phone,
                streetAddress, postalCode, city, country, admin
            })}>
                <label>First and Last name</label>
                <input
                    type="text"
                    placeholder="Enter your Full Name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)} />
                <label>Email</label>
                <input
                    type="email"
                    disabled={true}
                    value={user?.email} 
                    placeholder={'email'} />
                <UserDetails 
                    detailsProps={{phone,streetAddress,postalCode,city, country}}
                    setDetailsProps={handleDetailsChange}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 inline-flex item-center mb-2" htmlFor="adminCb">
                            <input
                                id="adminCb"
                                type="checkbox"
                                value={'1'}
                                checked={admin}
                                onClick={e => setAdmin(e.target.checked)} />
                            <span>Admin</span>
                        </label>

                    </div>
                )}
                <button type="submit" className="bg-primarybtn text-white rounded-md">Save</button>
            </form>
        </div>
    )
}