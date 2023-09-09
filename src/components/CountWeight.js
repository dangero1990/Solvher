import CountAnyWeight from './CountAnyWeight';
import CountByWeight from './CountByWeight';
import { useState } from 'react';

function CountWeight() {
  const [advanced, setAdvanced] = useState(false);

  function handleClick() {
    setAdvanced(!advanced);
  }

  return (
    <section id='weight-section'>
      {!advanced && <CountByWeight />}
      {advanced && <CountAnyWeight />}
      <button onClick={handleClick} id='advanced'>
        {advanced ? 'Basic' : 'Advanced'}
      </button>
    </section>
  );
}

export default CountWeight;
