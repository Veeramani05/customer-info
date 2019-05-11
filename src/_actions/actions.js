import { LIST_CUSTOMER, ADD_CUSTOMER, UPDATE_CUSTOMER } from './../_constants'

let customerId = 1;

export const addCustomer = (data) => {
  data["id"] = customerId;
  customerId++;
  return { data, type: ADD_CUSTOMER }
}

export const updateCustomer = (data) => { 
  return { data, type: UPDATE_CUSTOMER }
}

export const listCustomer = () => {
  return { type: LIST_CUSTOMER }
}