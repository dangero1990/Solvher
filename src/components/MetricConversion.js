import Card from '../shared/Card';
import UnitData from '../data/UnitData';
import { useState, useEffect } from 'react';

function MetricConversion() {
  const [unit, setUnit] = useState(UnitData[0]);
  const [isVolume, setIsVolume] = useState(false);
  const [net, setNet] = useState(0);
  const [input, setInput] = useState(0);
  const [density, setDensity] = useState(1);

  const units = UnitData.map((unit) => <option key={unit.id}>{unit.id}</option>);

  function handleSelect(e) {
    UnitData.map((unit) => (e.target.value === unit.id ? setUnit(unit) : null));
  }

  function solve(e) {
    e.preventDefault();
    let answer;

    switch (unit.id) {
      case 'grams':
        answer = parseFloat(input / 1000).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        break;
      case 'pounds':
        answer = parseFloat(input / 2.2046).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        break;
      case 'liters':
        answer = parseFloat(input * density);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        break;
      case 'mililiters':
        answer = parseFloat((input * density) / 1000).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        break;
      case 'gallons':
        answer = parseFloat(input * 3.7854 * density).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        break;
    }
  }

  useEffect(() => {
    unit.type === 'volume' ? setIsVolume(true) : setIsVolume(false);
  }, [unit]);

  return (
    <Card title='Metric Conversion'>
      <h3>Convert a different unit into KGs</h3>
      <form onSubmit={solve}>
        <label htmlFor='input'>Weight of item</label>
        <input type='text' name='input' onChange={(e) => setInput(+e.target.value)} inputMode='numeric' required />
        <select onChange={handleSelect}>{units}</select>
        {isVolume && <label htmlFor='density'>Density</label>}
        {isVolume && <input type='text' name='density' onChange={(e) => setDensity(+e.target.value)} inputMode='numeric' required />}
        <label htmlFor='solve'>Solve</label>
        <button type='submit' name='solve'>
          Submit
        </button>
      </form>
      <h4>Answer</h4>
      <p>{net} kg</p>
    </Card>
  );
}

export default MetricConversion;
