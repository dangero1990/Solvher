import CountAnyWeight from './CountAnyWeight';
import CountByWeight from './CountByWeight';
import { useState, useRef, useEffect } from 'react';

function CountWeight() {
  const [advanced, setAdvanced] = useState(false);
  const sectionRef = useRef(null);

  function handleClick() {
    setAdvanced(!advanced);
  }

  useEffect(() => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [advanced]);

  return (
    <section ref={sectionRef}>
      {!advanced && <CountByWeight />}
      {advanced && <CountAnyWeight />}
      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        {advanced ? <i className='mb-4'>Need to go back to the basics?</i> : <i>Need to count something unique?</i>}
        <button
          className='text-white bg-primary_blue font-bold border-none uppercase py-2 px-4 rounded-3xl block ml-auto mr-auto mt-2'
          onClick={handleClick}
        >
          {advanced ? 'Basic' : 'Advanced'}
        </button>
      </div>
    </section>
  );
}

export default CountWeight;
