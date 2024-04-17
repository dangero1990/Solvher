import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import clsx from 'clsx';

function CustomLink({ to, children, ...props }) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });

  return (
    <li>
      <Link
        to={to}
        {...props}
        className={isActive ? 'font-bold text-active_yellow' : ''}
      >
        {children}
      </Link>
    </li>
  );
}

function Navbar() {
  const [isClosed, setIsClosed] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleLoad = () => {
      setIsInitialRender(false);
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, [isSmallScreen]);

  function handleClick() {
    if (isSmallScreen) {
      setIsClosed(true);
    }
  }

  return (
    <header className='bg-primary_blue py-4 text-white'>
      <div className='max-w-[90%] mx-auto my-auto'>
        <h1 className='relative font-bold text-3xl inline'>Solvher</h1>
        <FontAwesomeIcon
          icon={faBars}
          id='hamburger'
          className='md:hidden block absolute right-8 top-0 translate-y-[100%]'
          onClick={() => setIsClosed(!isClosed)}
          size='xl'
        />
        <nav className={clsx('md:inline-block md:ml-8 mt-4 block md:visible ', { 'overflow-hidden transition-all duration-300 ease': !isInitialRender, 'invisible max-h-0': isClosed, 'max-h-96': !isClosed })}>
          <ul className='flex flex-col md:flex-row gap-4 text-center'>
            <CustomLink
              to=''
              onClick={handleClick}
            >
              Count by Weight
            </CustomLink>
            <CustomLink
              to='/metric-conversion'
              onClick={handleClick}
            >
              Metric Conversion
            </CustomLink>
            <CustomLink
              to='/barcode'
              onClick={handleClick}
            >
              Barcode Generator
            </CustomLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
