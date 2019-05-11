import { ADD_CUSTOMER, UPDATE_CUSTOMER } from '../_constants'
export const customer = (state = [], action) => {
  const { data, type } = action;
  switch (type) {
    case ADD_CUSTOMER:
      return [...state, data];
    case UPDATE_CUSTOMER:
      const INDEX = state.findIndex(x => x.id === data.id);
      state[INDEX] = data
      return state;
    default:
      return state;
  }
}




