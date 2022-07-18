import * as ActionTypes from "./ActionTypes";
import { STORIES } from "../shared/stories";
import Http from "../components/ApiComponent";

// export const loadData = (text) => {
//    return {
//       type: ActionTypes.LOAD_JSON_DATA,
//       payload: text,
//    };
// };

// export const deletePost = (id) => (dispatch) => {
//    Http.deletePost(id).then((value) => {
//       dispatch(displayApiData(value));
//    });
// };

// export const displayData = (data) => {
//    return {
//       type: ActionTypes.DISPLAY_JSON_DATA,
//       payload: data,
//    };
// };

export const displayApiData = (data) => {
   return {
      type: ActionTypes.DISPLAY_API_DATA,
      payload: { data, stories: STORIES },
   };
};
export const loading = () => (dispatch) => {
   Http.readPosts().then((value) => {
      dispatch(displayApiData(value));
   });
};
