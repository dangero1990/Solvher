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

  function submitFull(e) {
    e.preventDefault();

    if (store.some((label) => label.name === full.name)) {
      const newStore = store.filter((label) => label.name !== full.name);

      setStore(...newStore, [full]);
      setFull(initialFull);
      setSelect(full);
    } else {
      setStore([...store, full]);
      setFull(initialFull);
      setSelect(full);
    }
  }

  function handleSelect(e) {
    store.map((label) => (e.target.value === label.name ? setSelect(label) : null));
  }

  function solve(e) {
    e.preventDefault();

    setPart('');
    net.current = getCount(select.count, part, select.gross);
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
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          className='input-style'
          onChange={(e) => setFull({ ...full, name: e.target.value })}
          value={full.name}
          required
        />
        <label htmlFor='gross'>Weight</label>
        <input
          type='number'
          name='gross'
          className='input-style'
          onChange={(e) => setFull({ ...full, gross: parseFloat(e.target.value) })}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={full.gross}
          required
        />
        <label htmlFor='tare'>Count</label>
        <input
          type='number'
          name='count'
          className='input-style'
          onChange={(e) => setFull({ ...full, count: parseFloat(e.target.value) })}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={full.count}
          required
        />
        <CustomButton
          text='submit'
          type='submit'
          name='submit-full'
        />
      </form>
      <hr className='border-t-2 border-primary_blue' />
      <form
        className='grid mt-8 mb-4'
        onSubmit={solve}
      >
        <h3>Partial Unit</h3>
        <label htmlFor='rolls'>Select</label>
        <select
          name='rolls'
          onChange={handleSelect}
          value={select.name}
          className='input-style'
        >
          {store.map((label) => (
            <option key={label.name}>{label.name}</option>
          ))}
        </select>
        <label htmlFor='part-gross'>Weight</label>
        <input
          type='number'
          className='input-style'
          onChange={(e) => setPart(parseFloat(e.target.value))}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          value={part}
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
        <p>{net.current}</p>
      </div>
    </Card>
  );
}

export default CountAnyWeight;
