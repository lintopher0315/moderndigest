import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'
import { Col, Container, Row } from 'react-bootstrap';
import TwitterWindow from './TwitterWindow'
import Cloud from './Cloud'

class Results extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            tweets: [],
            tweetId: [],
            sentiment: [],
            links: [],
            keywords: [],
            positive: 0,
            neutral: 0,
            negative: 0,
            loading: false,
        }
    }

    getResults() {
        Promise.all([this.searchTwitter(), this.searchNewspaper()])
        .then(([tweets, news]) => {
            //this.setState({tweets: [], sentiment: [], links: []})
            for (var i = 0; i < tweets.length; i++) {
                this.setState({tweets: [...this.state.tweets, tweets[i].text], sentiment: [...this.state.sentiment, tweets[i].sentiment], tweetId: [...this.state.tweetId, tweets[i].id]})
            }
            for (i = 0; i < news.length; i++) {
                this.setState({links: [...this.state.links, news[i]]})
            }
            this.countSentiment()
            this.getKeywords()
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
                quantity: 10,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
    }

    getKeywords() {
        fetch('/digest/keywords', {
            method: 'POST',
            body: JSON.stringify({
                articles: this.state.links
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            for (var i = 0; i < json.length; i++) {
                this.setState({keywords: [...this.state.keywords, json[i]]})
            }
            this.setState({loading: true})
        })
    }

    countSentiment() {
        for (var i = 0; i < this.state.sentiment.length; i++) {
            if (this.state.sentiment[i] === "positive") {
                this.setState({ positive: this.state.positive + 1 })
            }
            else if (this.state.sentiment[i] === "neutral") {
                this.setState({ neutral: this.state.neutral + 1 })
            }
            else {
                this.setState({ negative: this.state.negative + 1 })
            }
        }
    }

    componentDidMount() {
        this.getResults()
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="result">
                    <Container className="twitter" fluid={true}>
                        <Row style={{paddingTop: 80, paddingBottom: 80, background: '#efc9e2'}}>
                            <Col md lg={true}>
                                <Pie data={{
                                    labels: [
                                        'Positive',
                                        'Neutral',
                                        'Negative'
                                    ],
                                    datasets: [{
                                        data: [this.state.positive, this.state.neutral, this.state.negative],
                                        backgroundColor: [
                                            '#FF6384',
                                            '#36A2EB',
                                            '#FFCE56'
                                        ],
                                        hoverBackgroundColor: [
                                            '#FF6384',
                                            '#36A2EB',
                                            '#FFCE56'
                                        ]
                                    }]
                                }}
                                //width={400}
                                //height={400}
                                //options={{ maintainAspectRatio: false }}
                                />
                            </Col>

                            <Col md lg={true}>
                                <TwitterWindow id={this.state.tweetId}/>
                            </Col>
                        </Row>

                        <Row style={{paddingTop: 20, background: '#f4d4e9'}}>
                            <Col md lg={true}>
                                <Cloud keywords={this.state.keywords}/>
                            </Col>

                            <Col md lg={true}>

                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        return (
            <div className="load">

            </div>
        )
    }
}

export default Results;