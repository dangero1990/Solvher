import { useState, useRef } from 'react';
import LabelData from '../data/LabelData';
import Card from '../shared/Card';

function CountByWeight() {
  const [select, setSelect] = useState(LabelData[0]);
  const [weight, setWeight] = useState(0);
  const count = useRef(0);
  const input = useRef(null);

  const handleSelect = (e) => {
    LabelData.map((label) => {
      if (e.target.value === label.id) {
        setSelect(label);
      }
    });
  };

  const handleCount = (e) => {
    const counted = +e.target.value;
    count.current = counted;
  };

  function solve(e) {
    e.preventDefault();

    const refCount = select.count;
    const refWeight = select.weight;
    const answer = Math.floor((refCount * count.current) / refWeight);

    setWeight(answer.toLocaleString('en-US'));
    input.current.value = null;
  }

  return (
    <Card title='Solve a Partial Label Roll'>
      <h3>Solve the quantity of a partial label roll with just the weight</h3>
      <form onSubmit={solve}>
        <div className='row'>
          <label htmlFor='select'>1. Select the specific kind of label you are counting</label>
          <select onChange={handleSelect} name='select'>
            {LabelData.map((label) => (
              <option key={label.id} value={label.id}>
                {label.id}
              </option>
            ))}
          </select>
        </div>
        <div className='row'>
          <label htmlFor='count'>2. Enter the weight of the partial role in KGs</label>
          <input onChange={handleCount} type='text' name='count' ref={input} />
        </div>
        <div className='row'>
          <label htmlFor='submit'>3. Click solve to get the number of labels</label>
          <button type='submit' name='submit'>
            Solve
          </button>
        </div>
        <p>Count on roll</p>
        <p>{weight}</p>
      </form>
    </Card>
  );
}

export default CountByWeight;
