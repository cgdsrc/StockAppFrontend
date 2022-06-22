import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StockPage from './components/StockPage';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import { getUserDetails } from "./api"
import axios from 'axios'

function App() {
  const [user, setUser] = useState([]);
  const [recall, setRecall] = useState(false);

  useEffect(() => {
    getUserDetails().then((response) => {
      setUser(response.data);
    });
  }, [recall]);


  return (

    <div className="App">
      <Header  {...user}></Header>
      <StockPage setRecall={setRecall} recall={recall} {...user}></StockPage>
    </div>
  );
}

export default App;
