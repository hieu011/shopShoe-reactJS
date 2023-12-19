import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import * as bootstrap from 'bootstrap';
import ShoesRender from './components/Shoes';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
                <ShoesRender/>
            </BrowserRouter>);
