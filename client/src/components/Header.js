import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button, Form, FormGroup, Col, Container, Row } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
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
                <Container className="header" fluid={true} style={{background: '#ff99de'}}>
                    <Row>
                        <Col xl lg={true} style={styles.title}>
                            <p>modern digest</p>
                        </Col>

                        <Col xl lg={true} style={{paddingTop: 25}}>
                            <Form horizontal>
                                <FormGroup>
                                    <Row>
                                        <Col sm={9}>
                                            <FormControl type="text" placeholder="Search" ref={this.textInput}/>
                                        </Col>
                                        <Col sm={20}>
                                            <Link to={`/search/q=${this.state.value}`}>
                                                <Button bsStyle="default" onClick={this.changeValue.bind(this)}>Search</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Form>
                        </Col>

                        <Col xl lg={true}>

                        </Col>
                    </Row>
                </Container>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/search/:query' component={() => <Results value={this.state.value}/>} />
                </Switch>
            </div>
        );
    }
}

let styles = {
    title: {
        fontFamily: 'Abril Fatface',
        fontSize: 50,
        textAlign: 'left',
        paddingLeft: 50,
    }
}

export default Header;