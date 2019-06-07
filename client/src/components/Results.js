import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'
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
            positive: 0,
            neutral: 0,
            negative: 0,
            loading: false,
        }
    }

    getResults() {
        return Promise.all([this.searchTwitter(), this.searchNewspaper()])
        .then(([tweets, news]) => {
            this.setState({tweets: [], sentiment: [], links: []})
            for (var i = 0; i < tweets.length; i++) {
                this.setState({tweets: [...this.state.tweets, tweets[i].text], sentiment: [...this.state.sentiment, tweets[i].sentiment], tweetId: [...this.state.tweetId, tweets[i].id]})
            }
            for (i = 0; i < news.length; i++) {
                this.setState({links: [...this.state.links, news[i]]})
            }
            this.countSentiment()
            this.setState({ loading: true })
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
                    width={400}
                    height={400}
                    options={{ maintainAspectRatio: false }}
                    />
                    <TwitterWindow id={this.state.tweetId}/>
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