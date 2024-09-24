import ReactDOM from 'react-dom/client';
import React from 'react';
import Router from './router';
import './assets/styles/index.css';
import './assets/styles/tailwind.css';
import { TerminalContextProvider } from 'react-terminal';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TerminalContextProvider>
            <Router />
        </TerminalContextProvider>
    </React.StrictMode>,
)