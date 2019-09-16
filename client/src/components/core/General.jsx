import React, {Component} from "react";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import SidePanel from "../layout/SidePanel";
import UserPanel from "../dashboard/UserPanel";
import PageHeading from "../layout/PageHeading";
import Popup from "../popup/Popup";
import PropTypes from "prop-types";
import {getGeneralUserPassword, getSingleUserPassword} from "../../actions/userPasswords"

class General extends Component {

  constructor(props){
    super(props);
    this.state = { showPopup: false,
      id: "",
      name: "",
      title: "",
      type: "general",
      password: "",
      confirm_password: "",
      url: "",
      comments: "",
      date: "",
      errors: {},
      isLoading: true,
      records:[],
      editRecord:[],
      valid: false,
      editMode: false
    };

    this.onShowPopup = this.onShowPopup.bind(this);
  }

  componentDidMount() {
    this.getPassword();
  };

  getPassword =()=> {
    const { user } = this.props.auth;
    fetch('/api/records/general/' + user.name +'/'+ this.state.type)
        .then((data) => data.json())
        .then((res) => this.setState({ records: res.data, isLoading: false }))
        .catch(error => {
            console.log(error.response)
        });

  };


  onShowPopup = e => {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
    document.body.classList.toggle("popup-bg");
  };

  getClosest = (elem, selector) => {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  };


  editRecords = e => {
    const { user } = this.props.auth;
    console.log(e.target);
   const parent = this.getClosest(e.target, "tr");
   const sibling = parent.children;


   console.log(sibling);
    console.log(sibling[0]);
    console.log(sibling[0].innerHTML);
    const searchStr = sibling[0].innerHTML;

    fetch('/api/records/' + searchStr +'/'+ user.name)
        .then((data) => data.json())
        .then((res) => this.setState({ editRecord: res.data}))
        .catch(error => {
          console.log(error.response)
        });

    this.setState({editMode: true});
    // this.setState({editRecords: this.props.editRecord});
    this.onShowPopup(e)

  };


  removeRecord = e => {
    console.log(e.target);
  };
  render() {
    let index = 0;

    const { isLoading, records } = this.state;
    const PassTable = ["Title", "type", "password", "url",  "date",""];
    const generalList = "general-list";
    const generalHead = "General Passwords";
    // console.log(editRecord);
    let{ user } = this.props.auth;
    return (
        <div className="dashboard container v-align">
          <div className="row panel set-height">
            <SidePanel list={generalList} />

            <div className="col-9">
              <UserPanel />
              <PageHeading heading={generalHead} />
              <div className="password-container">
                <table>
                  <thead>
                  <tr>
                    {PassTable.map(i => {
                      return (
                          <th key={'table-head-'+i}>{i}</th>

                      )
                    })}
                  </tr>
                  </thead>
                  <tbody>
                  {!isLoading ? (
                      records.map(record => {
                        ++ index;
                        const{id, name, title, type, password, url, date} = record;
                        return (
                            <tr key={name+ '-'+index}>
                              <td id="passName">{title}</td>
                              <td>{type}</td>
                              <td><span>{password}</span></td>
                              <td>{url}</td>
                              <td>{date}</td>
                              <td>
                                    <span onClick={this.editRecords}>
                                      <i className="fas fa-edit"></i>
                                    </span>
                                <span onClick={this.removeRecord}>
                                      <i className="fas fa-trash"></i>
                                    </span>
                              </td>
                              <td style={{display: 'none'}}>{id}</td>
                            </tr>
                        );
                      })
                  ):(
                      <tr>
                        <td>Loading...</td>
                      </tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-12 details">
                  <button className="btn btn-blue" onClick={this.onShowPopup}><i className="fas fa-plus"></i> Add new Login</button>
                </div>
              </div>
            </div>
          </div>
          {this.state.showPopup ?
              <Popup
                  text='Click "Close Button" to hide popup'
                  closePopup={this.onShowPopup.bind(this)}
                  user={ user }
                  updateLogin={this.getPassword.bind(this)}
                  edit = {this.state.editMode}
                  passType = { this.state.type }
                  editRecord = { this.state.editRecord }

              />
              : null
          }
        </div>
    );
  }
}
General.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getGeneralUserPassword: PropTypes.func.isRequired,
  // getSingleUserPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser, getGeneralUserPassword, getSingleUserPassword }
)(General);