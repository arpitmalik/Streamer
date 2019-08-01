import React, { Component } from "react";
import Modal from "../Modal/Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };
  renderActions = () => {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link className="ui button" to="/">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  onDismiss = () => {
    history.push("/");
  };

  render() {
    return this.props.stream ? (
      <Modal
        title="Delete Stream"
        content={`Do you want to delete the stream: "${
          this.props.stream.title
        }"?`}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    ) : null;
  }
}

const mapstateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapstateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
