import React from 'react'
import Link from 'next/link';

const NavItem = ({ href, children, onClick }) => (
    <ul>
        <li onClick={onClick} className='font-bold mr-8  hover:text-primary text-sm cursor-pointer'>
            <Link href={href}>{children}</Link>
        </li>
    </ul>
)

export default NavItem;

