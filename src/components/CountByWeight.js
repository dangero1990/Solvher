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
      <h3>Solve the quantity of a partial label roll with just the weight</h3>
      <form onSubmit={solve}>
        <label htmlFor='select'>1. Select the specific kind of label you are counting</label>
        <select onChange={handleSelect} name='select'>
          {LabelData.map((label) => (
            <option key={label.id} value={label.id}>
              {label.id}
            </option>
          ))}
        </select>
        <label htmlFor='count'>2. Enter the weight of the partial roll in KGs</label>
        <input onChange={(e) => setCount(+e.target.value)} type='text' name='count' ref={input} inputMode='numeric' required />
        <label htmlFor='num-of-rolls'>3. Number of rolls being counted</label>
        <input type='text' name='num-of-rolls' onChange={(e) => setRolls(+e.target.value)} inputMode='numeric' placeholder={rolls} ref={rollRef} />
        <label htmlFor='submit'>4. Click solve to get the number of labels</label>
        <button type='submit' name='submit'>
          Solve
        </button>
      </form>
      <p>Count on roll</p>
      <p>{weight}</p>
    </Card>
  );
}

export default CountByWeight;
