import { convertTimestampTostringBr } from "@/app/helper/convertTime"
import React, { useEffect, useRef, useState } from "react"

const AutoSerchFile = ({options, value, onChange}) =>{



    const [showOptions, setShowOptions] = useState(false)
    const [cursor, setCursor] = useState(-1)
    const ref = useRef();

    const select = option => {
        onChange(option)
        setShowOptions(false)
    }

    const handleChange = text => {
        onChange(text);
        setCursor(-1);
        if(!showOptions) {
            setShowOptions(true)
        }
    }

    const filteredOptions = options.filter((option) => option.ipaddress.includes(value))

    const moveCursorDown = () => {
        if(cursor < filteredOptions.length - 1) {
            setCursor(c => c + 1)
        }
    }

    const moveCursorUp = () => {
        if(cursor > 0) {
            setCursor(c => c - 1)
        }
    }

    const handleNav = (e) => {
        switch (e.key) {
            case "ArrowUp":
                moveCursorUp();
                break;
            case "ArrowDown":
                moveCursorDown();
                break;
            case "Enter":
                if(cursor >= 0 && cursor < filteredOptions.length) {
                    select(filteredOptions[cursor]);
                }
                break;
        }
    }

    useEffect(() => {
        const listener = e => {
            if(!ref.current.contains(e.target)) {
                setShowOptions(false)
                setCursor(-1)
            }
        };
        
        document.addEventListener('click', listener)
        document.addEventListener('focusin', listener)
        return () => { 
            document.removeEventListener('click', listener); 
            document.removeEventListener('focusin', listener); 
        }
    },[]);


    return (
        <div className="relative w-full" ref={ref} >
            Pesquisa de Server

        <input type="text" id='server' name='server' className="w-full px-5 py-3 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600" 
            value={value.ipaddress}
            onChange={e => handleChange(e.target.value)}
            onFocus={()=> setShowOptions(true)} 
            onKeyDown={handleNav}
            placeholder="127.0.0.1"
            />

        <ul className={`absolute w-full rounded-lg shadow-lg ${!showOptions && 'hidden'} select-none`}>
            {filteredOptions.length > 0 ? filteredOptions.map((option, i, arr) => {
                let className = "px-4 text-black bg-white "

                if(i === 0)
                    className += "pt-2 pb-1 rounded-t-lg"
                else if(i === arr.length)
                    className += "pt-1 pb-2 rounded-b-lg"
                else if(i ===0 && arr.length === 1)
                    className += "py-2 rounded-lg"
                else 
                    className += "py-1"

                if(cursor === i) {
                    className += " bg-gray-100"
                }


                return <li className={className} 
                    key={option.ipaddress}
                    onClick={() => select(option)}
                    > <hr /> {`${option.ipaddress}`}<br />
                    {`${option.name}`}<br />
                    {`${convertTimestampTostringBr(option.datetime)}`}</li>
            }) : <li className="px-4 py-2 text-black bg-white">No results</li>}
            
        </ul>
        </div>
    )

}


export default AutoSerchFile;