import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
  isLoading: true,
  errMess: null,
  dishes: []
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: null, dishes: action.payload};

    case ActionTypes.DISHES_LOADING:
      return {...state, isLoading: true, errMess: null, dishes: []};

    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: action.payload, dishes: []};

    default:
      return state;

  }
}

// export const Dishes = (state = DISHES, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };
