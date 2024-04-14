import { useState, useRef } from 'react';
import Card from '../shared/Card';
import CustomButton from '../shared/CustomButton';

function CountAnyWeight() {
  const [full, setFull] = useState({});
  const [store, setStore] = useState([]);
  const [part, setPart] = useState({});
  const [net, setNet] = useState(0);
  const refName = useRef(null);
  const refGross = useRef(null);
  const refCount = useRef(null);
  const partGross = useRef(null);

  function submitFull(e) {
    e.preventDefault();

    if (store.some((label) => label.name === full.name)) {
      const newStore = store.filter((label) => label.name !== full.name);

      setStore(...newStore, [full]);
      setNet(0);
      refName.current.value = null;
      refGross.current.value = null;
      refCount.current.value = null;
    } else {
      setStore([...store, full]);
      setNet(0);
      refName.current.value = null;
      refGross.current.value = null;
      refCount.current.value = null;
    }
  }

  function handleSelect(e) {
    store.map((label) => (e.target.value === label.name ? setFull(label) : null));
  }

  function solve(e) {
    e.preventDefault();

    partGross.current.value = null;
    const answer = Math.floor((full.count * part.gross) / full.gross);

    setNet(answer.toLocaleString('en-US'));
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
          ref={refName}
          required
        />
        <label htmlFor='gross'>Weight</label>
        <input
          type='number'
          name='gross'
          className='input-style'
          onChange={(e) => setFull({ ...full, gross: e.target.value })}
          ref={refGross}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
          required
        />
        <label htmlFor='tare'>Count</label>
        <input
          type='number'
          name='count'
          className='input-style'
          onChange={(e) => setFull({ ...full, count: e.target.value })}
          ref={refCount}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
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
          onChange={(e) => setPart({ ...part, gross: e.target.value })}
          ref={partGross}
          inputMode='decimal'
          step='any'
          pattern='[0-9]*'
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
        <p>{net}</p>
      </div>
    </Card>
  );
}

export default CountAnyWeight;
