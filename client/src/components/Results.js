import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'
import { Col, Container, Row } from 'react-bootstrap';
import WordCloud from 'react-d3-cloud'
import TwitterWindow from './TwitterWindow'

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
            worddata: [],
            positive: 0,
            neutral: 0,
            negative: 0,
            loading: false,
        }
    }

    getResults() {
        return Promise.all([this.searchTwitter(), this.searchNewspaper()])
        .then(([tweets, news]) => {
            this.setState({tweets: [], sentiment: [], links: [], keywords: []})
            for (var i = 0; i < tweets.length; i++) {
                this.setState({tweets: [...this.state.tweets, tweets[i].text], sentiment: [...this.state.sentiment, tweets[i].sentiment], tweetId: [...this.state.tweetId, tweets[i].id]})
            }
            for (i = 0; i < news.length; i++) {
                this.setState({links: [...this.state.links, news[i]]})
            }
            this.getKeywords()
            this.countSentiment()
            this.setState({loading: true})
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
        return fetch('/digest/keywords', {
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
            this.fillCloud()
        })
    }

    fillCloud() {
        for (var i = 0; i < this.state.keywords.length; i++) {
            var found = false
            for (var j = 0; j < this.state.worddata.length; j++) {
                if (this.state.worddata[j].text === this.state.keywords[i]) {
                    var stateCopy = this.state.worddata;
                    stateCopy[j].value += 1;
                    this.setState({worddata: stateCopy});
                    found = true;
                    break;
                }
            }
            if (!found) {
                var copy = this.state.worddata;
                copy.push({text: this.state.keywords[i], value: 1})
                this.setState({worddata: copy})
            }
        }
        console.log(this.state.worddata)
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
                    <Container className="twitter" fluid={true} style={{background: '#f4d4e9'}}>
                        <Row style={{paddingTop: 20, paddingBottom: 20}}>
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
                    </Container>
                    <WordCloud
                        data={this.state.worddata}
                    />
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