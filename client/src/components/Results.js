import React, { Component } from 'react';

class Results extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            tweets: [],
            sentiment: [],
            links: [],
        }
    }

    getResults() {
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

    componentDidMount() {
        console.log(this.state.value)
        this.getResults()
    }

    render() {
        return (
            <div className="result">
                {this.state.tweets}
                {this.state.sentiment}
                <br />
                <br />
                {this.state.links}
            </div>
        )
    }
}

export default Results;