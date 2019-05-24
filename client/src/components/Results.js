import React, { Component } from 'react';

class Results extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tweets: this.props.location.state.tweets,
            sentiment: this.props.location.state.sentiment,
            links: this.props.location.state.links,
        }
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