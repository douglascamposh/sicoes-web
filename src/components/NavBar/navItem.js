import React from 'react'
import Link from 'next/link';
import Title from '../common/title';

const NavItem = ({ href, children, onClick }) => (
    <ul>
        <li onClick={onClick} className='mr-8 text-sm cursor-pointer'>
            <Link href={href}>
             <Title>{children}</Title>
            </Link>
        </li>
    </ul>
)

export default NavItem;

