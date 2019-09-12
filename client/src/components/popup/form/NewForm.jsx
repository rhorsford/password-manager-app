import React, {Component} from "react";
import classnames from "classnames";


class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      type: "",
      password: "",
      confirm_password: "",
      url: "",
      comments: "",
      edit: props.edit,
      editRecord: [],
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

  }

  render() {

    const {errors} = this.state;
    return (
        <form noValidate onSubmit={this.props.onSubmit}>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <span className="red-text">
                  {errors.title}
                  </span>
            <input
                onChange={this.props.change}
                value={this.props.title}
                error={errors.title}
                id="title"
                type="text"
                className={classnames("", {
                  invalid: errors.title
                })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <span className="red-text">
                  {errors.password}
                  </span>
            <input
                onChange={this.props.change}
                value={this.props.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="confirm_password">Confirm Password</label>
            <span className="red-text">
                  {errors.confirm_password}
                  </span>
            <input
                onChange={this.props.change}
                value={this.props.confirm_password}
                error={errors.confirm_password}
                id="confirm_password"
                type="password"
                className={classnames("", {
                  invalid: errors.confirm_password
                })}
            />
            <i className="fas fa-eye" onClick={this.props.passwordShow}></i>
          </div>

          <div className="input-field">
            <label htmlFor="url">URL</label>

            <input
                onChange={this.props.change}
                value={this.props.url}
                id="url"
                type="text"
            />
          </div>

          <div className="input-field">
            <label htmlFor="comments">Comments</label>
            <textarea
                onChange={this.props.change}
                value={this.props.comments}
                id="comments"
                rows="4"
                cols="50"
            >
                  </textarea>
          </div>

          <div className="input-field">
            <button
                type="submit"
                className="btn btn-primary"
            >
              New Details
            </button>
          </div>

        </form>

    );
  }
}

export default NewForm;

