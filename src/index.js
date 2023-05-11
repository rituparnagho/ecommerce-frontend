import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from './store'
// import { positions, transitions, Provider as AlertProvider} from 'react-alert'
// import AlertTemplate from "react-alert-template-basic"

const root = ReactDOM.createRoot(document.getElementById('root'));

// const options = {
//   timeout:5000,
//   position:positions.BOTTOM_CENTER,
//   transition:transitions.SCALE
// }

root.render(
  <Provider store={store}>
    <BrowserRouter>
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
    <App />
    {/* </AlertProvider> */}
    </BrowserRouter>
  </Provider>
);


