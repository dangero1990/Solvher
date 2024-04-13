import { useState, useRef } from 'react';
import LabelData from '../lib/LabelData';
import Card from '../shared/Card';
import { getCount } from '../lib/myFunctions';

const initialValues = {
  rolls: 1,
  weight: null,
};

function CountByWeight() {
  const [select, setSelect] = useState(LabelData[0]);
  const [partial, setPartial] = useState(initialValues);
  const answer = useRef(0);
  const resultRef = useRef(null);

  const handleSelect = (e) => {
    LabelData.map((label) => (e.target.value === label.id ? setSelect(label) : null));
  };

  function solve(e) {
    e.preventDefault();

    answer.current = getCount(select.count, partial.weight, select.weight, select.tare, partial.rolls);
    setPartial(initialValues);

    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Card title='Solve a Partial Label Roll'>
      <div className='instructions'>
        <p>Instructions</p>
        <ol>
          <li>Select the kind of label being counted</li>
          <li>Enter the weight of partial roll(s) being counted in kilograms</li>
          <li>Enter the number of rolls being counted. </li>
          <li>Click submit</li>
        </ol>
      </div>
      <hr />
      <form onSubmit={solve}>
        <label htmlFor='select'>1. Select label</label>
        <select
          onChange={handleSelect}
          name='select'
        >
          {LabelData.map((label) => (
            <option
              key={label.id}
              value={label.id}
            >
              {label.id}
            </option>
          ))}
        </select>
        <label htmlFor='count'>2. Weight of label(s)</label>
        <input
          onChange={(e) => setPartial({ ...partial, weight: parseFloat(e.target.value) })}
          type='number'
          inputMode='decimal'
          name='count'
          value={partial.weight === null ? '' : partial.weight}
          step='any'
          pattern='[0-9]*'
          required
        />
        <label htmlFor='num-of-rolls'>3. Number of rolls</label>
        <input
          type='number'
          name='num-of-rolls'
          onChange={(e) => setPartial({ ...partial, rolls: parseInt(e.target.value) })}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          placeholder={partial.rolls}
          value={partial.rolls}
        />
        <button
          type='submit'
          name='submit'
        >
          Submit
        </button>
      </form>
      <div
        className='results'
        ref={resultRef}
      >
        <p>Count on roll</p>
        <p>{answer.current}</p>
      </div>
    </Card>
  );
}

export default CountByWeight;
