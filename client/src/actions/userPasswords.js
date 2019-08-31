
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  // SET_CURRENT_USER,
  USER_LOADING
} from "./types";
//Post User details
const valid = true;

export const validChecker = (val) => {

  console.log(val);

  const newVar = val;

  return newVar;

};

// export const userPassword = (newRecord, history) => dispatch => {
//   const that = this;
// axios
//       .post("/api/records/email", newRecord)
//     .then((response) => {
//       console.log(response);
//       history.push("/email");
//       that.setState({showPopup: false})
//     }, (error) => {
//       dispatch({
//               type: GET_ERRORS,
//               payload: error.response.data
//             });
//       console.log(error);
//     });
//
// };
      // .then(res => {return{valid}}) // re-direct to login on successful register
      // .catch(err =>
      //     dispatch({
      //       type: GET_ERRORS,
      //       payload: err.response.data
      //     })
      // );


// };




export const getGeneralUserPassword = (records) => dispatch => {
  axios .get("/api/records/general/", records)
      .then(response => {
        console.log(response.data);
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );

};


export const getEmailUserPassword = (records) => dispatch => {
  axios .get("/api/records/email/", records)
      .then(response => {
        console.log(response.data);
      })
      .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
      );

};

// export const getUserPassword = (records) => dispatch => {
//   axios .get("/api/records/email", records)
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(err =>
//           dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//           })
//       );
// };

  // axios
  //     .get("/api/records/email", {
  //       params: {
  //         name: "richard"
  //       }
  //     })
  //     .then(response =>
  //         response.data.results.map(record => ({
  //           name: `${record.name}`,
  //           title: `${record.title}`,
  //           password: `${record.password}`,
  //           confirm_password: `${record.confirm_password}`,
  //           url: `${record.url}`,
  //           comments: `${record.comments}`,
  //         }))
  //     )
  //     // We can still use the `.catch()` method since axios is promise-based
  //     .catch(err =>
  //         dispatch({
  //           type: GET_ERRORS,
  //           payload: err.response.data
  //         })
  //     );


      // .catch(error => this.setState({error, isLoading: false}));
// }
// Login - get user token
// export const loginUser = userData => dispatch => {
//   axios
//       .post("/api/users/login", userData)
//       .then(res => {
//         // Save to localStorage
// // Set token to localStorage
//         const { token } = res.data;
//         localStorage.setItem("jwtToken", token);
//         // Set token to Auth header
//         setAuthToken(token);
//         // Decode token to get user data
//         const decoded = jwt_decode(token);
//         // Set current user
//         dispatch(setCurrentUser(decoded));
//       })
//       .catch(err =>
//           dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//           })
//       );
// };
// // Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };
// // User loading
// export const setUserLoading = () => {
//   return {
//     type: USER_LOADING
//   };
// };
// // Log user out
// export const logoutUser = () => dispatch => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };
