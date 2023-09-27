import { useState, useRef } from 'react';
import LabelData from '../data/LabelData';
import Card from '../shared/Card';

function CountByWeight() {
  const [select, setSelect] = useState(LabelData[0]);
  const [weight, setWeight] = useState(0);
  const [rolls, setRolls] = useState(1);
  const [count, setCount] = useState(0);
  const input = useRef(null);
  const rollRef = useRef(null);

  const handleSelect = (e) => {
    LabelData.map((label) => (e.target.value === label.id ? setSelect(label) : null));
  };

  function solve(e) {
    e.preventDefault();

    const refCount = select.count;
    const refWeight = select.weight - select.tare;
    const selectCount = count - select.tare * rolls;
    const answer = Math.floor((refCount * selectCount) / refWeight);

    setWeight(answer.toLocaleString('en-US'));
    setRolls(1);
    input.current.value = null;
    rollRef.current.value = null;
  }

  return (
    <Card title='Solve a Partial Label Roll'>
      <div className='instructions'>
        <p>Instructions</p>
        <p>1. Select the kind of label being counted</p>
        <p>2. Enter the weight of partial roll(s) being counted in kilograms</p>
        <p>3. Enter the number of rolls being counted. </p>
        <p>4. Click submit</p>
      </div>
      <hr />
      <form onSubmit={solve}>
        <label htmlFor='select'>1. Select label</label>
        <select onChange={handleSelect} name='select'>
          {LabelData.map((label) => (
            <option key={label.id} value={label.id}>
              {label.id}
            </option>
          ))}
        </select>
        <label htmlFor='count'>2. Weight of label(s)</label>
        <input onChange={(e) => setCount(+e.target.value)} type='text' name='count' ref={input} inputMode='numeric' required />
        <label htmlFor='num-of-rolls'>3. Number of rolls</label>
        <input type='number' name='num-of-rolls' onChange={(e) => setRolls(e.target.value)} step='any' placeholder={rolls} ref={rollRef} />
        <button type='submit' name='submit'>
          Submit
        </button>
      </form>
      <div className='results'>
        <p>Count on roll</p>
        <p>{weight}</p>
      </div>
    </Card>
  );
}

export default CountByWeight;
