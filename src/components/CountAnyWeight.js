import { useState, useRef } from 'react';
import Card from '../shared/Card';

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
    <Card title='Count unique item'>
      <div className='instructions'>
        <p>Instructions</p>
        <p>1. Choose a name for the item you are counting.</p>
        <p>2. Enter the weight of the material in kilograms.</p>
        <p>3. Enter the amount being counted.</p>
        <p>4. After creating a refernce unit you can select it from the drop down menu under the partial unit section.</p>
        <p>5. Enter the weight of the partial unit.</p>
        <p>6. Click submit</p>
      </div>
      <form onSubmit={submitFull}>
        <h3>Refernce unit</h3>
        <i>Filling this section of the form out creates a reference for you to use to count anything by weight</i>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' onChange={(e) => setFull({ ...full, name: e.target.value })} ref={refName} required />
        <label htmlFor='gross'>Weight</label>
        <input type='text' name='gross' onChange={(e) => setFull({ ...full, gross: +e.target.value })} ref={refGross} inputMode='numeric' required />
        <label htmlFor='tare'>Count</label>
        <input type='text' name='count' onChange={(e) => setFull({ ...full, count: +e.target.value })} ref={refCount} inputMode='numeric' required />
        <button type='submit' name='submit-full'>
          Submit
        </button>
      </form>
      <hr />
      <form onSubmit={solve}>
        <h3>Partial Unit</h3>
        <label htmlFor='rolls'>Select</label>
        <select name='rolls' onChange={handleSelect}>
          {store.map((label) => (
            <option key={label.name}>{label.name}</option>
          ))}
        </select>
        <label htmlFor='part-gross'>Weight</label>
        <input type='text' onChange={(e) => setPart({ ...part, gross: +e.target.value })} ref={partGross} inputMode='numeric' required />
        <button type='submit' name='submit-part'>
          Submit
        </button>
      </form>
      <div className='results'>
        <p>Count on roll</p>
        <p>{net}</p>
      </div>
    </Card>
  );
}

export default CountAnyWeight;
