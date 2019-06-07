import React, { Component } from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { FixedSizeList as List } from 'react-window';

class TwitterWindow extends Component {

    constructor(props) {
        super(props);

    }

    Row = ({ index, style }) => (
        <div className="entry" style={style}>
            <TwitterTweetEmbed
                tweetId={this.props.id[index].toString()}
                options={{cards: 'hidden', hideCard: true, hideThread: true, conversation: 'none'}}
            />
        </div>
    );

    render() {
        if (this.props.id.length > 20) {
            return (
                <List
                    height={450}
                    itemCount={20}
                    itemSize={450}
                    width={520}
                >
                    {this.Row}
                </List>
            )
        }
        return (
            <List
                height={450}
                itemCount={this.props.id.length}
                itemSize={450}
                width={520}
            >
                {this.Row}
            </List>
        )
    }
}

export default TwitterWindow