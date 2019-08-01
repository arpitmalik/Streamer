import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import { toast } from "react-toastify";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  toastmessage = () => {
    toast.error("You do not have the permission to edit this stream.");
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else if (this.props.stream.userId === this.props.currentUserId) {
      return (
        <div>
          <h3>Edit a stream</h3>
          <StreamForm
            initialValues={{
              title: this.props.stream.title,
              description: this.props.stream.description
            }}
            onSubmit={this.onSubmit}
          />
        </div>
      );
    }
    if (
      this.props.currentUserId &&
      this.props.stream.userId !== this.props.currentUserId
    ) {
      return (
        <div>
          {this.toastmessage()}
          <h3>You do not have the permission to edit this stream.</h3>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
