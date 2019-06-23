import React, { Component } from 'react';
import WordCloud from 'react-d3-cloud'

class Cloud extends Component {

    constructor(props) {
        super(props);

        this.state = {
            worddata: [],
        }
    }

    fillCloud() {
        for (var i = 0; i < this.props.keywords.length; i++) {
            var found = false
            for (var j = 0; j < this.state.worddata.length; j++) {
                if (this.state.worddata[j].text === this.props.keywords[i]) {
                    var stateCopy = this.state.worddata;
                    stateCopy[j].value += 1;
                    this.setState({worddata: stateCopy});
                    found = true;
                    break;
                }
            }
            if (!found) {
                var copy = this.state.worddata;
                copy.push({text: this.props.keywords[i], value: 1})
                this.setState({worddata: copy})
            }
        }
        for (i = this.state.worddata.length - 1; i >= 0; i--) {
            if (this.state.worddata[i].value <= 1 && this.state.worddata.length > 10) {
                this.state.worddata.splice(i, 1)
            }
        }
    }

    componentDidMount() {
        this.fillCloud()
    }

    render() {
        var sizeMapper = word => (Math.log2(word.value) + 3) * 12;
        return (
            <WordCloud
                data={this.state.worddata}
                fontSizeMapper={sizeMapper}
                width={750}
                height={750}
            />
        );
    }
}

export default Cloud;