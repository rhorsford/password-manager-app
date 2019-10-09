import React from 'react'
import axios from "axios";

export const getClosest = (elem, selector) => {
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

export const findRow =(e) =>{
  const parent = getClosest(e.target, "tr");
  return  parent.id;
};


  export const editRecords = (e, user, searchStr) => fetch('/api/records/' + user +'/' + searchStr)
        .then((data) => data.json())
        .then((res) => res.data);

export const getPasswords = (type, user) => fetch('/api/records/'+ type +'/' + user + '/' + type)
        .then((data) => data.json())
        .then((res) => res.data);

export const removeRecords = (e) => axios.delete("/api/records/delete/" + findRow(e))
        .then((res) => console.log(res));


// Dashboard

  export const dashboardNumbers = (user, type) => fetch('/api/records/password/' + user +'/' + type)
        .then((data) => data.json())
        .then((res) => res.data);

  export const dashboardTotalNumbers = (user) => fetch('/api/records/total/' + user)
      .then((data) => data.json())
      .then((res) => res.data);