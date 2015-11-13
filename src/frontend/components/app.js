const React = require("react");
const Counter = require("./counter")

const {reddish} = require("./styles")
const {Component} = React

const {Card, CardText} = require('material-ui');

export default class App extends Component {
    render() {
        const {counter1, counter2} = this.props   // see site.js and server.js
        return (
            <div>
                <Header />
                <Card zDepth={4}>
                    <CardText>
                        Hey Jorge!
                    </CardText>
                    <Counter
                        initialValue={counter1}
                        step={100}
                        interval={150}/>
                    <Counter
                        initialValue={counter2}
                        step={1000}
                        interval={100}/>
                </Card>
                <Footer />
            </div>
        )
    }
}

// LiveReactload supports also non-exported "inner" classes!
class Header extends Component {
    render() {
        return (
            <h1 style={reddish}>Users!</h1>
        )
    }
}

// as well as old React.createClass({...}) syntax!
const Footer = React.createClass({
    render() {
        return (
            <footer>
                <p>Delaney!</p>
                <p>Try to change the code on-the-fly!</p>
            </footer>
        )
    }
});
