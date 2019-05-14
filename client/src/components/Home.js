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
            sentiment: [],
            links: [],
        };
    }

    searchQuery() {
        return Promise.all([this.searchTwitter(), this.searchNewspaper()])
        .then(([tweets, news]) => {
            this.setState({tweets: [], sentiment: [], links: []})
            for (var i = 0; i < tweets.length; i++) {
                this.setState({tweets: [...this.state.tweets, tweets[i].text], sentiment: [...this.state.sentiment, tweets[i].sentiment]})
            }
            for (i = 0; i < news.length; i++) {
                this.setState({links: [...this.state.links, news[i]]})
            }
        })
    }

    searchTwitter() {
        return fetch('/digest/twitter', {
            method: 'POST',
            body: JSON.stringify({
                query: this.state.value,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
    }

    searchNewspaper() {
        return fetch('/digest/newspaper', {
            method: 'POST',
            body: JSON.stringify({
                query: this.state.value,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
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
                    {this.state.sentiment}
                    <br />
                    <br />
                    {this.state.links}
                </p>
            </div>
        );
    }
}

export default Home;