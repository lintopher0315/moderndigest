import React, { Component } from 'react';
import { Button, Form, FormGroup, Col } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';

class Home extends Component {

    constructor(props) {
        super(props);

        this.textInput = React.createRef();

        this.state = {
            value: "",
            tweets: [],
            links: "",
        };
    }

    searchQuery() {
        fetch('/digest/twitter', {
            method: 'POST',
            body: JSON.stringify({
                query: this.state.value,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })
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
                            <FormControl type="text" placeholder="Search" ref={this.textInput} onChange={() => this.changeValue()}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={1} sm={10}>
                            <Button bsStyle="default" onClick={this.searchQuery.bind(this)}>Search</Button>
                        </Col>
                    </FormGroup>
                </Form>

                <br />
                <p>
                    {this.state.tweets}
                    <br />
                    <br />
                    {this.state.links}
                </p>
            </div>
        );
    }
}

export default Home;