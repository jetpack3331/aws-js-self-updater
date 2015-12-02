import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './views/Homepage';
import Footer from './views/Footer';
import SafeEval from 'notevil';
import DataTable from './views/DataTable';

/**
 * AWS init
 */
AWS.config.update({
    region: '<region>',
    accessKeyId: '<accessKeyId>',
    secretAccessKey: '<secretAccessKey>'
});

/**
 * Static default version constant
 * @type {number}
 */
let VERSION = 2;

/**
 * This can be redux actions or something else
 *
 * @param actionName
 * @param params
 */
let reduxLocalAction = (actionName, params) => {
  switch(actionName) {
      case "fetchData":
          fetch('http://jsonplaceholder.typicode.com' + params.path)
              .then((res) => {
                  return res.json()
              }).then((json) => {
                  renderDom({dataTable: json})
              });
          break;
  }
}

/**
 * Application middleware, keys is functions called in AWS lambda
 * - sure can work with local functions like reducers, actions etc.
 * - Its called "external interface" shortly "ExFace" :)
 */
let AplicationApi = {
    callMeMaybe: (sayToMe) => {
        alert(sayToMe);
    },
    callReduxAction: (actionName, params) => {
        reduxLocalAction(actionName, params);
    },
    alert(message) {
        alert(message);
    }
};

var lambda = new AWS.Lambda();
export default class App extends React.Component {

    render() {
        return (
            <div>
                <div>My app in version ({VERSION})</div>
                <Homepage />
                {this.props.serverData.dataTable ? <DataTable data={this.props.serverData.dataTable} /> : null}
                <Footer html={this.props.serverData.footer ? this.props.serverData.footer : null} />
            </div>
        )
    }
}

let renderDom = (serverData = {}) => {
    ReactDOM.render(<App serverData={serverData} />, document.getElementById('app'));
};

/**
 * Call first app render
 */
renderDom();

/**
 * Call every 4s Lambda function for new structures
 */
setInterval(() => {
    lambda.invoke({
        FunctionName: 'WebCheckForUpdates',
        Payload: JSON.stringify({
            version: VERSION
        })
    }, function(err, data) {
        let response = JSON.parse(data.Payload);
        if (response.availableVersion > VERSION) {
            /**
             * New version number
             */
            VERSION = response.availableVersion;
            /**
             * Render DOM with new data
             */
            renderDom(response.html);
            /**
             * Is there some JS what should be called?
             * - dont forget on ApplicationApi interface
             */
            if (response.customJs) {
                response.customJs.forEach((func) => {
                    SafeEval(func, AplicationApi);
                });
            }
        }
    });
}, 4000);