//* All the AXIOS API calls will be made from here to the backend
//* These functions will be exported and then imported wherever needed

import Axios from "axios";

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

export const RegisterUser = async (credentials) => {
  try {
    console.log(credentials);

    const Post = await Axios.post(` https://devcom-production.onrender.com/register`, credentials);

    return Post;
  } catch (error) {
    console.log(error);
    alert("Could not register user!");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

export const LoginUser = async (credentials) => {
  try {
    console.log(credentials);

    const Post = await Axios.post(` https://devcom-production.onrender.com/login`, credentials);

    return Post;
  } catch (error) {
    console.log(error);
    alert("Could not login, please try again later!");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

export const PostFeed = async (details) => {
  try {
    console.log(details);

    const Post = await Axios.post(` https://devcom-production.onrender.com/post-feed`, details);

    return Post;
  } catch (error) {
    console.log(error);
    alert("Could not post your feed, please try again later!");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

export const GetAllPosts = async () => {
  try {
    const Posts = await Axios.get(` https://devcom-production.onrender.com/getAllPosts`);

    return Posts;
  } catch (error) {
    console.log(error);
    alert("Could not get all posts, please try again later!");
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
export const UpdateUser = async (userId, details) => {
  try {
    console.log(details);

    const Submission = await Axios.patch(`https://devcom-production.onrender.com/updateUser/${userId}`, details);

    return Submission;
  } catch (error) {
    console.log(error);
    alert("Could not edit your profile, please try again later!");
  }
};