import React, { useEffect, useState } from "react";

const OpenLettersData = () => {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = "https://dummyjson.com/posts";

    fetch(URL)
      .then((res) => {
        return res.json(); //convert it into readable format/parsed
      })
      .then((data) => {
        setPosts(data.posts);
      });
  };

  return post;
};

export default OpenLettersData;
