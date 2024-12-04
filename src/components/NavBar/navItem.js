import React from 'react'
import Link from 'next/link';
import Title from '../common/title';

const NavItem = ({ href, children, onClick, className }) => (
  <li onClick={onClick} className={`mr-8 text-sm cursor-pointer ${className}`}>
    <Link href={href}>
      <Title className={className}>{children}</Title>
    </Link>
  </li>
);

export default NavItem;
