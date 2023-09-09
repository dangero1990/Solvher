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
    <Card title='Count any roll'>
      <h2>Full unit</h2>
      <form onSubmit={submitFull}>
        <label htmlFor='name'>name</label>
        <input type='text' name='name' onChange={(e) => setFull({ ...full, name: e.target.value })} ref={refName} />
        <label htmlFor='gross'>gross</label>
        <input type='text' name='gross' onChange={(e) => setFull({ ...full, gross: +e.target.value })} ref={refGross} />
        <label htmlFor='tare'>count</label>
        <input type='text' name='count' onChange={(e) => setFull({ ...full, count: +e.target.value })} ref={refCount} />
        <label htmlFor='submit-full'>Submit full</label>
        <button type='submit' name='submit-full'>
          Submit
        </button>
      </form>
      <h2>Partial unit</h2>
      <form onSubmit={solve}>
        <select name='rolls' onChange={handleSelect}>
          {store.map((label) => (
            <option key={label.name}>{label.name}</option>
          ))}
        </select>
        <label htmlFor='part-gross'>Gross</label>
        <input type='text' onChange={(e) => setPart({ ...part, gross: +e.target.value })} ref={partGross} />
      </form>
      <p>Count on roll</p>
      <p>{net}</p>
    </Card>
  );
}

export default CountAnyWeight;
