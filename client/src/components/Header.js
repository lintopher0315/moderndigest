import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Results from './Results'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <p>hello</p>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/search/:query' component={Results} />
                </Switch>
            </div>
        )
    }
}

export default Header;