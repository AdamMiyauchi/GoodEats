import React, { Component } from 'react';
import Requests from '../requests.js'


class Test extends Component {

    constructor(props) {
        super()

        this.state = {
            something : "--------",
            count : 0
        }

        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return(
            <div>
                APi result: 
                <br/>
                <button onClick={this.handleClick}>button</button>
                {this.state.something}
                {this.state.count}
            </div>
        )
    }

    
    handleClick() {
        Requests.getTest()
            .then( (res) => {
                this.setState({something : res.data, count : this.state.count + 1})
            })
    }

}



export default Test;

