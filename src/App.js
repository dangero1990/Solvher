import './App.css';
import MetricConversion from './components/MetricConversion';
import CountWeight from './components/CountWeight';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='' element={<CountWeight />} />
          <Route path='/metric-conversion' element={<MetricConversion />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
