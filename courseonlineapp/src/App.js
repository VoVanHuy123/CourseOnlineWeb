import logo from './logo.svg';
import './App.css';
import { MyUserContext } from './Configs/Context';
import { useReducer } from 'react';
import { MyUserReducer } from './components/Reducers/MyUserReducer';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  // const [cartCounter, cartDispatch] = useReducer(MyCartReducer, 0);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      {/* <MyCartContext.Provider value={[cartCounter, cartDispatch]}> */}
        <BrowserRouter>
          <Header />

          {/* <Container> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/cart" element={<Carr />} /> */}
            </Routes>
          {/* </Container> */}

          <Footer />
        </BrowserRouter>
      {/* </MyCartContext.Provider> */}
     </MyUserContext.Provider>
  )
}

export default App;
