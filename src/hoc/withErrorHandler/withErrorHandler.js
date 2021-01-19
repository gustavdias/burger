import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, instanceAxios) => {
  return class extends Component {
    state = {
      error: null,
    };
    //axios listener, global interceptor
    //we execute this code when this component here gets created
    componentWillMount() {

    // componentDidMount() {
      // this.reqInterceptor = axios.interceptors.request.use((req) => {
      //should actually remove the interceptors when this component gets unmounted,
      this.reqInterceptor = instanceAxios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      //   this.resInterceptor creates a resInterceptor property in the state
      this.resInterceptor = instanceAxios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
    //   console.log("willUnmount in withErrorHandlerComponent", this.reqInterceptor, this.resInterceptor);
      instanceAxios.interceptors.request.eject(this.reqInterceptor);
      instanceAxios.interceptors.response.eject(this.resInterceptor);
    }
    //when the modal is closed, the error is cleared!
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;

// const withErrorHandler = (WrappedComponent, axios) => {
//     return (props) => {
//       return (
//         <React.Fragment>
//           <Modal show={}>Something didn't work!</Modal>
//           {/* //distribute props, no to lose them {...props} */}
//           <WrappedComponent {...props} />
//         </React.Fragment>
//       );
//     };
//   };

//   export default withErrorHandler;
