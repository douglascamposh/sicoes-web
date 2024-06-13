import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from './common/button';
const MobileDropdown = ({ dataDropdownList, textDropdown, isOpen, toggleDropdown }) => {
    return (
        <div className="relative w-full">
            <div className=''>
                <Button onClick={toggleDropdown} className="flex justify-between">
                    <span className=''>{textDropdown}</span>
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
            </div>
            <div className="border-b border-white mb-6 w-full"></div>
            {isOpen && (
                <div className="">
                    <ul>
                        {dataDropdownList.map((item, index) => (
                            <li key={index} className="py-2 px-4 text-white">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileDropdown;