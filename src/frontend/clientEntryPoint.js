const React = require('react');
const ReactDOM = require("react-dom");

const App = require("./components/app");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById("app"));