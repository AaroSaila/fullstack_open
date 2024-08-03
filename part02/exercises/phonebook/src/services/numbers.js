"use strict";


import axios from "axios";


const baseUrl = `http://localhost:3001/persons/`;


const getAll = () => {
  return axios.get(baseUrl).then(request => request.data);
}


const create = (personObject) => {
  return axios.post(baseUrl, personObject).then(response => response.data);
}


const deleteNumber = id => {
  return axios.delete(`${baseUrl}${id}`);
}


const update = newPerson => {
  return axios.put(`${baseUrl}${newPerson.id}`, newPerson).then(response => response.data)
}


export default {getAll, create, deleteNumber, update};
