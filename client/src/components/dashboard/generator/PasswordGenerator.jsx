import React, {Component} from "react";

class PasswordGenerator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generate: '',
    };
  }

  passGenerate = () => {
    const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz*&#",
        pwdLen = 15,
        randPassword = Array(pwdLen).fill(pwdChars).map(function (x) {
          return x[Math.floor(Math.random() * x.length)]
        }).join('');
    this.setState({generate: randPassword});
  };

  copyPassword = () => {
    const copyText = document.getElementById("generator");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };

  render() {
    return (
        <div className="col-6 metrics generator">
          <h2 className="underline">Generator</h2>
          <div className="input-field">
            <input
                onChange={this.onUpdate}
                value={this.state.generate}
                id="generator"
                type="text"
            />
            <button className="btn btn-blue" onClick={this.copyPassword}><i className="far fa-copy"></i> Copy</button>
          </div>
          <button className="btn btn-green"  onClick={this.passGenerate}><i className="fas fa-edit"></i>Generate</button>
        </div>
    )
  }
}

export default PasswordGenerator