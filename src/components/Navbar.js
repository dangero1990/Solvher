import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CustomLink({ to, children, ...props }) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });

  return (
    <li>
      <Link to={to} {...props} className={isActive ? 'active' : ''}>
        {children}
      </Link>
    </li>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <header>
      <h1>Solvher</h1>
      <FontAwesomeIcon icon={faBars} id='hamburger' onClick={handleClick} size='xl' />
      <nav className='primary-nav'>
        <ul>
          <CustomLink to=''>Count by Weight</CustomLink>
          <CustomLink to='/metric-conversion'>Metric Conversion</CustomLink>
        </ul>
      </nav>
      <nav className='secondary-nav'>
        {isOpen && (
          <ul>
            <CustomLink to=''>Count by Weight</CustomLink>
            <CustomLink to='/metric-conversion'>Metric Conversion</CustomLink>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
