import { useState, useRef } from 'react';
import Card from '../shared/Card';
import CustomButton from '../shared/CustomButton';
import { getCount } from '../lib/myFunctions';

const initialFull = {
  name: '',
  gross: '',
  count: '',
};

function CountAnyWeight() {
  const [full, setFull] = useState(initialFull);
  const [select, setSelect] = useState({});
  const [store, setStore] = useState([]);
  const [part, setPart] = useState('');
  const net = useRef(0);
  const netRef = useRef(null);
  const partRef = useRef(null);

  function submitFull(e) {
    e.preventDefault();

    if (store.some((label) => label.name === full.name)) {
      const newStore = store.filter((label) => label.name !== full.name);

      setStore(...newStore, [full]);
      setFull(initialFull);
      setSelect(full);
      setTimeout(() => {
        partRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setStore([...store, full]);
      setFull(initialFull);
      setSelect(full);
      setTimeout(() => {
        partRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function handleSelect(e) {
    store.find((label) => (e.target.value === label.name ? setSelect(label) : null));
  }

  function solve(e) {
    e.preventDefault();

    setPart('');
    net.current = getCount(select.count, part, select.gross);
    setTimeout(() => {
      netRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <Card
      title='Count unique item'
      instructions={['Choose a name for the item you are counting', 'Enter the weight of the material in kilograms', 'Enter the amount being counted', 'After creating a refernce unit you can select it from the drop down menu under the partial unit section', 'Enter the weight of the partial unit', 'Click submit']}
    >
      <form
        className='grid mb-4'
        onSubmit={submitFull}
      >
        <h3>Refernce unit</h3>
        <i className='mb-4'>Filling this section of the form out creates a reference for you to use to count anything by weight</i>
        <label htmlFor='full-name'>Name</label>
        <input
          type='text'
          name='full-name'
          className='input-style'
          onChange={(e) => setFull({ ...full, name: e.target.value })}
          value={full.name}
          data-testid='full-name'
          required
        />
        <label htmlFor='full-gross'>Weight</label>
        <input
          type='number'
          name='full-gross'
          className='input-style'
          onChange={(e) => setFull({ ...full, gross: parseFloat(e.target.value) })}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={full.gross}
          data-testid='full-gross'
          required
        />
        <label htmlFor='full-count'>Count</label>
        <input
          type='number'
          name='full-count'
          className='input-style'
          onChange={(e) => setFull({ ...full, count: parseFloat(e.target.value) })}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={full.count}
          data-testid='full-count'
          required
        />
        <CustomButton
          text='submit'
          type='submit'
          name='submit-full'
          data-testid='full-submit'
        />
      </form>
      <hr className='border-t-2 border-primary_blue' />
      <form
        className='grid mt-8 mb-4'
        onSubmit={solve}
      >
        <h3 ref={partRef}>Partial Unit</h3>
        <label htmlFor='part-name'>Select</label>
        <select
          name='part-name'
          onChange={handleSelect}
          value={select.name}
          className='input-style'
          data-testid='store'
        >
          {store.map((label) => (
            <option key={label.name}>{label.name}</option>
          ))}
        </select>
        <label htmlFor='part-gross'>Weight</label>
        <input
          type='number'
          name='part-gross'
          className='input-style'
          onChange={(e) => setPart(parseFloat(e.target.value))}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={part}
          data-testid='part-gross'
          required
        />
        <CustomButton
          text='submit'
          type='submit'
          name='submit-part'
        />
      </form>
      <div className='text-center font-bold text-xl'>
        <p>Count of item</p>
        <p ref={netRef}>{net.current}</p>
      </div>
    </Card>
  );
}

export default CountAnyWeight;
