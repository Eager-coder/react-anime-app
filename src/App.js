import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Animes from './components/Animes'
import Nav from './components/Nav';
import Anime from './components/Anime'
import Season from './components/Season'
import Home from './components/Home'
import ErrorBoundary from './components/ErrorBoundary'
function App() {
    return (
        <Router>
            <div className="App">
                    <Nav />
                        <ErrorBoundary>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/season" component={Season}/>
                            <Route  path="/anime/:id" component={Anime}/>
                        <Route exact path="/search/:name" component={Animes} />
                    </Switch>
                        </ErrorBoundary>
                    
            </div>
        </Router>
    );
}

export default App;
