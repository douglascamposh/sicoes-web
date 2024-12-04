import React from 'react'
import { fontBodyMonserrat } from '../utils/fonts';

const descrition = fontBodyMonserrat;

 const DescriptionContent = ({ children, className}) => ( 
    <div className={`${descrition.className} text-black text-xs ${className}`}>
        {children}
    </div>
  )


export default DescriptionContent;
