export default function UserDetails({detailsProps, setDetailsProps}){
    const {phone, streetAddress, postalCode, city, country} = detailsProps;
    return(
        <>
            <label>Phone Number</label>
            <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={e =>setDetailsProps('phone', e.target.value)} />
            <label>Street Address</label>
            <input
                type="text"
                placeholder="Street address"
                value={streetAddress}
                onChange={e => setDetailsProps('streetAddress', e.target.value)} />
            <div className="flex gap-2">
                <div>
                    <label>Postal Code</label>
                    <input
                        type="text" placeholder="Postal code"
                        value={postalCode}
                        onChange={e => setDetailsProps('postalCode', e.target.value)} />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text" placeholder="City"
                        value={city}
                        onChange={e=> setDetailsProps('city', e.target.value)} />
                </div>
            </div>
            <label>Country</label>
            <input type="text"
                placeholder="Country"
                value={country}
                onChange={e => setDetailsProps('country', e.target.value)} />
        </>
    )
}