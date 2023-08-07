import React from 'react';
import { Header, Footer, Calculate } from './containers';
import { Navbar } from './components';
import './App.css';
import CarbonFootprintContext from './containers/CarbonFootprintContext';


const App = () => {
  const [postcode, setPostcode] = React.useState('');
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState('');
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <div>
        <CarbonFootprintContext.Provider value={{ postcode, data, total, setPostcode, setData, setTotal }}>
            <Calculate />
            <Footer />
        </CarbonFootprintContext.Provider>
      </div>
    </div>
  )
}

export default App
