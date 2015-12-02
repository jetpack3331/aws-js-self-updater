import React from 'react';

export default class Footer extends React.Component {

    render() {
        return (
            this.props.html ?
            <div dangerouslySetInnerHTML={{__html: this.props.html}}></div> :
            <div>Actual footer</div>
        )
    }
}