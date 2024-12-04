import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from './common/button';
import Title from './common/title';
import DescriptionContent from './common/description';

const MobileDropdown = ({ dataDropdownList, textDropdown, isOpen, toggleDropdown, className }) => (
        <div className="relative w-full">
                <Button onClick={toggleDropdown}>
                     <div className='flex'>
                     <Title className={className}>{textDropdown}</Title>
                      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                     </div>
                </Button>
            <div className="border-b border-white mb-6 w-full"></div>
            {isOpen && (
                <div className="ml-2">
                   {dataDropdownList.map((item) => item)}
                </div>
            )}
        </div>
    );

export default MobileDropdown;