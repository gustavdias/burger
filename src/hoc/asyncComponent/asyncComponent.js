import React, { Component } from 'react';


//! Volta - lazy loading
//dynamic import syntax and then give us a promise where we eventually get the component we want it to load and where we then render this component.
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;