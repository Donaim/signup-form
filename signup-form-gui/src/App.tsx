import React from 'react';
import { CreateEventForm } from './CreateEventForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (<Router>
                <Route path="/" exact component={CreateEventForm} />
                <Route path="/events" component={() => <p> TODO </p>} />
            </Router>);
}

export default App;
