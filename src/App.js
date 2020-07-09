import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './css/App.css';
import Animes from './components/Animes'
import Nav from './components/Nav';
import Anime from './components/Anime'
import Home from './components/Home'
import ErrorBoundary from './components/ErrorBoundary'
import Favorites from './components/Favorites'
function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                <ErrorBoundary>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/anime/:id" component={Anime}/>
                        <Route exact path="/search/anime/:name" component={Animes} />
                        <Route exact path="/search/genres/:genre/:id" component={Animes} />
                        <Route exact path="/search/seasons/:season/:id" component={Animes}/>
                        <Route exact path="/search/ratings/:rating/:id" component={Animes}/>
                        <Route exact path="/search/types/:type/:id" component={Animes}/>
                        <Route exact path="/favorites" component={Favorites}/>
                    </Switch>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;
