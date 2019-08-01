import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

export default class Header extends Component {
  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Streamer
        </Link>
        <div className="right menu">
          <Link to="/" className="item">
            All Streams
          </Link>
          {/* Google Auth Button */}
          <GoogleAuth />
        </div>
      </div>
    );
  }
}
