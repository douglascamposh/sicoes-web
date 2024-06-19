import React from 'react'
import { fontBody } from '../utils/fonts';

const descrition = fontBody;

 const DescriptionContent = ({ children, className}) => {
  return ( 
    <div className={`${descrition.className} ${className} text-black text-xs`}>
        {children}
    </div>
  )
}

export default DescriptionContent;
