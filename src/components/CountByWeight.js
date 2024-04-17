import { useState, useRef } from 'react';
import LabelData from '../lib/LabelData';
import Card from '../shared/Card';
import { getCount } from '../lib/myFunctions';
import CustomButton from '../shared/CustomButton';

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
    LabelData.find((label) => (e.target.value === label.id ? setSelect(label) : null));
  };

  function solve(e) {
    e.preventDefault();

    answer.current = getCount(select.count, partial.weight, select.weight, select.tare, partial.rolls);
    setPartial(initialValues);

    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Card
      title='Solve a Partial Label Roll'
      instructions={['Select the kind of label being counted', 'Enter the weight of partial roll(s) being counted in kilograms', 'Enter the number of rolls being counted', 'Click submit']}
    >
      <form
        className='grid mb-4'
        onSubmit={solve}
      >
        <ol className='list-decimal mb-4'>
          <li>
            <label htmlFor='select'>Select label</label>
            <select
              onChange={handleSelect}
              name='select'
              className='input-style'
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
          </li>
          <li>
            <label htmlFor='count'>Weight of label(s)</label>
            <input
              onChange={(e) => setPartial({ ...partial, weight: parseFloat(e.target.value) })}
              type='number'
              inputMode='decimal'
              name='count'
              value={partial.weight === null ? '' : partial.weight}
              step='any'
              pattern='[0-9]*'
              className='input-style'
              required
            />
          </li>
          <li>
            <label htmlFor='num-of-rolls'>Number of rolls</label>
            <input
              type='number'
              name='num-of-rolls'
              onChange={(e) => setPartial({ ...partial, rolls: parseInt(e.target.value) })}
              inputMode='decimal'
              step='any'
              pattern='[0-9]*'
              value={partial.rolls}
              className='input-style'
            />
          </li>
        </ol>
        <CustomButton
          text='submit'
          type='submit'
          name='submit'
        >
          Submit
        </CustomButton>
      </form>
      <div
        className='text-center font-bold text-xl'
        ref={resultRef}
      >
        <p className='text-primary_color'>Count on roll</p>
        <p>{answer.current}</p>
      </div>
    </Card>
  );
}

export default CountByWeight;
