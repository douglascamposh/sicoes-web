import { FormControl, Select, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Filter = ({ column }) => {
    const columnFilterValue = column.getFilterValue();

    return (
        <FormControl size="small" variant="outlined" className="w-20">
            <Select
                value={columnFilterValue?.toString() || 'all'}
                onChange={(e) => column.setFilterValue(e.target.value === 'all' ? undefined : e.target.value === 'true')}
                IconComponent={KeyboardArrowDownIcon}
                className='text-[0.6rem] px-0.20 py-0.10 rounded border text-white'
                MenuProps={{
                    PaperProps: {
                        className: 'text-xs shadow-md',
                    },
                }}
            >
                <MenuItem value="all" className="text-sm text-blue-300">
                    Todo
                </MenuItem>
                <MenuItem value="No" className="text-sm text-blue-300">
                    No
                </MenuItem>
                <MenuItem value="Si" className="text-sm text-blue-300">
                    Si
                </MenuItem>
            </Select>
        </FormControl>
    );
}



export default Filter;