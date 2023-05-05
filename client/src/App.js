import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import rootReducer from './utils/reducer';

import './styles/main.scss';

const store = configureStore({ reducer: rootReducer });

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
