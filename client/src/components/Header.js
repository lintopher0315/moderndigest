import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button, Form, FormGroup, Col } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect, Link } from 'react-router-dom';
import Home from './Home';
import Results from './Results'

class Header extends Component {

    constructor(props) {
        super(props);

        this.textInput = React.createRef();

        this.state = {
            value: "",
            redirect: false
        };
    }

    changeValue() {
        this.setState({value: this.textInput.current.value})
    }

    render() {
        return (
            <div className="feed">
                <Form horizontal>
                    <FormGroup controlId="text">
                        <Col sm={2}>
                            Search:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Search" ref={this.textInput}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Link to={`/search/q=${this.state.value}`}>
                                <Button bsStyle="default" onClick={this.changeValue.bind(this)}>Search</Button>
                            </Link>
                        </Col>
                    </FormGroup>
                </Form>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/search/:query' component={() => <Results value={this.state.value}/>} />
                </Switch>
            </div>
        );
    }
}

export default Header;