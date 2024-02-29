import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiCaretUp, PiCaretDown } from "react-icons/pi";
export default function MenuPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }]
        });
    }
    function editProp(e, index, prop) {
        const newVal = e.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newVal;
            return newSizes;
        })
    }
    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }
    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex items-center p-1 border-0 justify-start gap-2"
                type="button">
                {isOpen && (
                    <PiCaretUp />
                )}
                {!isOpen && (
                    <PiCaretDown />
                )}
                <span>{name}</span>
                <span>{props?.length}</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex items-end gap-2">
                        <div>
                            <label>Name</label>
                            <input type="text"
                                placeholder="Size name"
                                value={size.name}
                                onChange={e => editProp(e, index, 'name')} />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text"
                                placeholder="Extra price"
                                value={size.price}
                                onChange={e => editProp(e, index, 'price')} />
                        </div>
                        <div>
                            <button type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-3 px-2"><FaRegTrashAlt /></button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white">{addLabel}</button>
            </div>

        </div>
    )
}