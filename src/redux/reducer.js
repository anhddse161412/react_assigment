import * as ActionTypes from "./ActionTypes";

export const Reducer = (state = {}, action) => {
   switch (action.type) {
      // case ActionTypes.DISPLAY_JSON_DATA:
      //    return {
      //       stories: action.payload,
      //    };
      case ActionTypes.DISPLAY_API_DATA:
         return {
            posts: action.payload.data,
            stories: action.payload.stories,
         };
      default:
         return state;
   }
};
