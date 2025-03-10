import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const Filter = ({ handleAuction, currentFilter }) => {
    const handleOnChange = (e) => {
        const selectedValue = e.target.value;
        let auctionValue;
        if (selectedValue === "all") {
            auctionValue = null; 
        } else {
            auctionValue = selectedValue === "true"; 
        }
        handleAuction(auctionValue);
    };

    return (
        <FormControl size="small" variant="outlined" className="w-20">
            <Select
                value={currentFilter === null ? "all" : currentFilter === true ? "true" : "false"}
                onChange={handleOnChange}
                IconComponent={KeyboardArrowDownIcon}
                className="text-[0.6rem] px-0.20 py-0.10 rounded border text-white"
                MenuProps={{
                    PaperProps: {
                        className: "text-xs shadow-md",
                    },
                }}
            >
                <MenuItem value="all" className="text-sm text-blue-300">
                    Todo
                </MenuItem>
                <MenuItem value="false" className="text-sm text-blue-300">
                    No
                </MenuItem>
                <MenuItem value="true" className="text-sm text-blue-300">
                    Sí
                </MenuItem>
            </Select>
        </FormControl>
    );
};


export default Filter;