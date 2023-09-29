import './css/App.css';
import { useState, useEffect} from 'react';
import Register from './components/Register.jsx';
import Loading from './components/Loading.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }
    , [])
  return (
    <main className="App">
      {loading ?
        <Loading />
        :
      <Register/>
}
    </main>
  );
}

export default App;
