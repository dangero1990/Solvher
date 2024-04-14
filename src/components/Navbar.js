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
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isSmallScreen) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, [isSmallScreen]);

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
        <nav className={clsx('md:inline-block md:ml-8 mt-4 block md:visible', { 'invisible h-0': isClosed })}>
          <ul className='flex flex-col md:flex-row gap-4 text-center'>
            <CustomLink
              to=''
              onClick={() => setIsClosed(!isClosed)}
            >
              Count by Weight
            </CustomLink>
            <CustomLink
              to='/metric-conversion'
              onClick={() => setIsClosed(!isClosed)}
            >
              Metric Conversion
            </CustomLink>
            <CustomLink
              to='/barcode'
              onClick={() => setIsClosed(!isClosed)}
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
