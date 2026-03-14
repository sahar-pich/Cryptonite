import './assets/css/root.css';
import './assets/css/navbar.css';
import './assets/css/rtr.css';
import './assets/css/ai.css';
import './assets/css/about.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componens/Home';
import Rtr from './componens/Rrt';
import Ai from './componens/Ai';
import About from './componens/About';
import Navbar from './componens/Navbar';
import { Provider } from 'react-redux';
import { store } from './store/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rtr" element={<Rtr />} />
            <Route path="/ai" element={<Ai />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
