import { baseURL } from "../constants/actionTypes";

const url = baseURL;

export const getImages = () => {
  return fetch(`${url}/photos`);
};
