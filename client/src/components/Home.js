import React, { Component } from 'react';
import { Button, Form, FormGroup, Col } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);

        this.textInput = React.createRef();

        this.state = {
            value: "",
            redirect: false
        };
    }

    searchQuery() {
        this.setState({redirect: true})
    }

    changeValue() {
        this.setState({value: this.textInput.current.value})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: `/search/q=${this.state.value}`,
                state: {
                    value: this.state.value
                }
            }}/>;
        }
        else {

        }
        return (
            <div className="feed">
                <Form horizontal>
                    <FormGroup controlId="text">
                        <Col sm={2}>
                            Search:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="text" placeholder="Search" ref={this.textInput} onChange={() => this.changeValue()}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Button bsStyle="default" onClick={this.searchQuery.bind(this)}>Search</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Home;