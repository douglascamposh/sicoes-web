import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from './common/button';
import Title from './common/title';
import DescriptionContent from './common/description';
const MobileDropdown = ({ dataDropdownList, textDropdown, isOpen, toggleDropdown }) => {
    return (
        <div className="relative w-full">
                <Button onClick={toggleDropdown}>
                     <div className='flex'>
                     <Title className=''>{textDropdown}</Title>
                      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                     </div>
                </Button>
            <div className="border-b border-white mb-6 w-full"></div>
            {isOpen && (
                <div className="">
                    <ul>
                        {dataDropdownList.map((item, index) => (
                            <li key={index} className="py-2 px-4 text-white">
                               <DescriptionContent>{item}</DescriptionContent> 
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileDropdown;