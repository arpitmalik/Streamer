import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // initialise sign in.
      window.gapi.client
        .init({
          clientId:
            "877955867948-ka2repiesmmng4996cvd3br1v7n466rk.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          //get auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          // check status of user.
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  //   Check auth status
  onAuthChange = isSignedIn => {
    //Fetch User Id
    const userId = this.auth.currentUser.get().getId();
    if (isSignedIn) {
      this.props.signIn(userId);
    } else {
      this.props.signOut();
    }
  };
  //Sign In
  onSignInClick = () => {
    try {
      this.auth.signIn();
    } catch (error) {
      console.log("error", error);
    }
  };
  //Sign Out
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return (
        <button className="ui red google button">
          <i className="google icon" />
          Loading...
        </button>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" /> Sign in with google
        </button>
      );
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {
    signIn,
    signOut
  }
)(GoogleAuth);
