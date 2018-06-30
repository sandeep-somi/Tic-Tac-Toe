import React from 'react';

export default class Square extends React.Component {
    state = {
        value: null
    }
    render() {
        return (
            <button
                className="square"
                onClick={() => this.setState({ value: "x" })}
            >
                {this.state.value}
            </button>
        )
    }
}