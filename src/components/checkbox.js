import React from 'react';

const Checkbox = ({ items, title, selectedItem, handleCheckboxChange }) => {
    return (
        <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center">
            <h3 className="mb-2 font-bold text-gray-800 mr-6">{title}</h3>
            <div className="flex flex-wrap items-center space-x-4">
                {items.map((item) => (
                    <div key={item.ItemId} className="flex items-center space-x-2 mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded"
                            value={item.ItemId}
                            checked={selectedItem === item.ItemId}
                            onChange={handleCheckboxChange}
                        />
                        <span className="text-gray-700 text-base">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checkbox;