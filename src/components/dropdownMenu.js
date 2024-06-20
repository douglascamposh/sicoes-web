import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from './common/button';
import Title from './common/title';

const DropdownMenu = ({ dataDropdownList, textDropdown }) => (
    <div className="relative group">
        <Button className="flex items-center hover:cursor-pointer">
            <div className='flex flex-row'>
                <Title className="text-[15px]">{textDropdown}</Title>
                <KeyboardArrowDownIcon className="group-hover:rotate-180 transition-transform" />
            </div>
        </Button>
        <div className="absolute hidden left-0 w-48 bg-white shadow-lg z-10 group-hover:block">
            <ul className="py-1">
                {dataDropdownList.map((item, index) => (
                    <li
                        key={index}
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-300"
                    >
                        <Title>{item}</Title>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default DropdownMenu;





