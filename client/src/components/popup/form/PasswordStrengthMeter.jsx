import React, {Component } from "react";
import zxcvbn from"../../../../node_modules/zxcvbn/dist/zxcvbn"



class PasswordStrengthMeter extends Component {
  constructor(props) {
    super(props);

  }

  createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };

  render() {
    const { passwordLength } = this.props;
    const testedResult = zxcvbn(passwordLength);
    return (
        <div className="input-field password-strength-meter">
          <label
              className="password-strength-meter-label"
          >
            {passwordLength && (
                <div>
                  <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
                </div>
            )}
          </label>
          <progress
              className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
              value={testedResult.score}
              max="4"
          />

        </div>
    );
  }
}
export default PasswordStrengthMeter;
