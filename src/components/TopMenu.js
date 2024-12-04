
import React, { useState, useEffect } from 'react';
import DropdownMenu from './dropdownMenu';
import NavItem from './NavBar/navItem';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import MobileDropdown from './mobileDropdown';

const TopMenu = () => {
  const router = useRouter();
  const [menuIcon, setMenuIcon] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/sicoesitems", label: "Sicoes" },
  ];


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenInfo = JSON.parse(atob(token.split('.')[1]));
      const email = tokenInfo?.sub
      setUserEmail(email);
    }
  }, [])


  const [isOpenMovileDropDown, setIsOpenMovileDropDown] = useState(false);

  const toggleDropdown = () => {
    setIsOpenMovileDropDown(!isOpenMovileDropDown);
  };

  const handleSmallScreenNav = () => {
    setMenuIcon(!menuIcon);
  }

  const handleRegister = () => {
    router.push('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    router.push('/sicoesitems');
  }


  const optionRegisterButton = (
    <button onClick={handleRegister}>
      <span>register</span>
    </button>
  );

  const userOptionsButton = (
    <button onClick={handleLogout}>
      <span>Cerrar sesión</span>
    </button>
  );
  const userOptionsButtonList = [userOptionsButton];
  const dataDropDownList = [optionRegisterButton];
  const textDropdown = "MenuDeplegable";

  return (
    <header className='bg-white w-full ease-in duration-300 fixed top-0 z-50 shadow-md py-4'>
      <nav className='container mx-auto px-4 flex justify-between items-center'>
        <div>
          <Link href="/">
            <span className="font-serif text-3xl md:text-2xl xl:text-3xl cursor-pointer text-gray-800">
              Logo
            </span>
          </Link>
        </div>
          <div className='flex items-center'>
            <ul className='hidden md:flex uppercase space-x-10 text-gray-700'>
              {navItems.map(({ href, label }) => (
                <NavItem key={href} href={href} onClick={handleSmallScreenNav}>
                  {label}
                </NavItem>
              ))}
            </ul>
            <div className='relative hidden md:flex ml-10'>
              <DropdownMenu dataDropdownList={dataDropDownList} textDropdown={textDropdown} textColor="text-gray-700"></DropdownMenu>
            </div>
            <ul>
              { userEmail ? (
                <div className='relative hidden md:flex ml-10'>
                  <DropdownMenu dataDropdownList={userOptionsButtonList} textDropdown={userEmail} textColor="text-gray-700"></DropdownMenu>
                </div>
              ) : (
                <div className='relative hidden md:flex ml-10'>
                  <NavItem key={'algo'} href="/login">
                    Iniciar sesión
                  </NavItem>
                </div>
              )}
            </ul>
            <div onClick={handleSmallScreenNav} className="flex md:hidden cursor-pointer ml-10 text-gray-700">
              {menuIcon ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
      </nav>
      <div className={`md:hidden absolute top-[100px] mt-[-30px] right-0 left-0 flex justify-center opacity-90 items-center w-full h-screen bg-gray-900 text-white ease-in duration-200 ${menuIcon ? "" : "left-[100%]"}`}>
        <div className="w-full flex justify-center mt-[-290px] flex-col">
          <ul className="font-bold text-2xl flex flex-col w-full">
            {navItems.map(({ href, label }) => (
              <div key={href} className="mr-[30px] ml-10">
                <NavItem href={href}  onClick={handleSmallScreenNav} className="text-white">
                  {label}
                </NavItem>
                <div className="border-b border-white mb-6 w-full"></div>
              </div>
            ))}
          </ul>
          <div className='mr-[30px] ml-10'>
            <MobileDropdown
              className='text-white'
              dataDropdownList={dataDropDownList}
              textDropdown={textDropdown}
              isOpen={isOpenMovileDropDown}
              toggleDropdown={toggleDropdown} />
          </div>
        </div>
      </div>
    </header>
  )
}
export default TopMenu;
