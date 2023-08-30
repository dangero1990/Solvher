import './App.css';
import CountByWeight from './components/CountByWeight';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <CountByWeight />
      </main>
    </>
  );
}

export default App;
