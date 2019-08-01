import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className="header">
        Page you are requesting is not available. Please click here to {" "}
        <Link to="/">return to homepage.</Link>
      </div>
    );
  }
}
