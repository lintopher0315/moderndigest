import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, Col } from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tweets: [],
            links: "",
        };
    }

    searchQuery() {
        fetch('/digest/twitter', {
            method: 'POST',
            body: JSON.stringify({
                query: this.textInput.value,
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

    render() {
        return (
            <div className="feed">
                <Form horizontal>
                    <FormGroup controlId="query">
                        <Col sm={2}>
                            Search:
                        </Col>
                        <Col sm={9}>
                            <FormControl type="query" placeholder="Search" inputRef={input => this.textInput = input}/>
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