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
      <div id='advanced'>
        {advanced ? <i>Need to go back to the basics?</i> : <i>Need to count something unique?</i>}
        <button onClick={handleClick}>{advanced ? 'Basic' : 'Advanced'}</button>
      </div>
    </section>
  );
}

export default CountWeight;
