import Card from '../shared/Card';
import UnitData from '../lib/UnitData';
import { useState, useEffect, useRef } from 'react';
import CustomButton from '../shared/CustomButton';

function MetricConversion() {
  const [unit, setUnit] = useState(UnitData[0]);
  const [isVolume, setIsVolume] = useState(false);
  const [net, setNet] = useState(0);
  const [input, setInput] = useState(0);
  const [density, setDensity] = useState(1);
  const inputRef = useRef(null);
  const densityRef = useRef(null);
  const netRef = useRef(null);

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
        inputRef.current.value = null;
        break;
      case 'pounds':
        answer = parseFloat(input / 2.2046).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        inputRef.current.value = null;
        break;
      case 'liters':
        answer = parseFloat(input * density);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        inputRef.current.value = null;
        densityRef.current.value = null;
        break;
      case 'mililiters':
        answer = parseFloat((input * density) / 1000).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        inputRef.current.value = null;
        densityRef.current.value = null;
        break;
      case 'gallons':
        answer = parseFloat(input * 3.7854 * density).toFixed(3);
        setNet(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        inputRef.current.value = null;
        densityRef.current.value = null;
        break;
      default:
        break;
    }
    setTimeout(() => {
      netRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  useEffect(() => {
    unit.type === 'volume' ? setIsVolume(true) : setIsVolume(false);
  }, [unit]);

  return (
    <Card
      title='Metric Conversion'
      instructions={['Enter the weight of the item you are wanting to convert', 'Select the unit of current unit of weight that you are wanting to convert', 'If the unit you are trying to convert is a unit of volume you must enter a density', 'Click Submit']}
    >
      <form
        className='grid mb-4'
        onSubmit={solve}
      >
        <label htmlFor='input'>Weight of item</label>
        <input
          type='number'
          name='input'
          onChange={(e) => setInput(e.target.value)}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          ref={inputRef}
          className='input-style'
        />
        <select
          onChange={handleSelect}
          className='input-style'
        >
          {units}
        </select>
        {isVolume && <label htmlFor='density'>Density</label>}
        {isVolume && (
          <input
            type='number'
            name='density'
            onChange={(e) => setDensity(e.target.value)}
            inputMode='decimal'
            step='any'
            pattern='[0-9]*'
            ref={densityRef}
            className='input-style'
            required
          />
        )}
        <CustomButton
          text='submit'
          type='submit'
          name='solve'
        />
      </form>
      <div className='text-center font-bold text-xl'>
        <p>Answer</p>
        <p ref={netRef}>{net} kg</p>
      </div>
    </Card>
  );
}

export default MetricConversion;
