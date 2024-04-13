import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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

  function handleClick() {
    setIsClosed(!isClosed);
  }

  function handleSelect() {
    setIsClosed(false);
  }

  return (
    <header className='relative bg-primary_blue py-4 text-white'>
      <div className='max-w-[90%] mx-auto my-auto'>
        <h1 className='font-bold text-3xl'>Solvher</h1>
        <FontAwesomeIcon
          icon={faBars}
          id='hamburger'
          onClick={handleClick}
          size='xl'
        />
        <nav className={isClosed ? 'open' : ''}>
          <ul>
            <CustomLink
              to=''
              onClick={handleSelect}
            >
              Count by Weight
            </CustomLink>
            <CustomLink
              to='/metric-conversion'
              onClick={handleSelect}
            >
              Metric Conversion
            </CustomLink>
            <CustomLink
              to='/barcode'
              onClick={handleSelect}
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
