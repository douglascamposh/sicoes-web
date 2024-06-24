import React from 'react'
import { fontTitleMonserrat } from '../utils/fonts';


const title = fontTitleMonserrat;
const Title = ({ children, className}) => (
  <div className={`${title.className} text-black text-sm ${className}`} >
    {children}
  </div>
)


export default Title;
