import React from "react";
import "./Articles.css";
import { articles_list } from "./articles_data";

const Articles = () => {
  return (
    <div className="articlesmain">
      <div className="articleshead">
        <h1>Articles</h1>
      </div>

      {articles_list.map((item) => {
        return (
          <div className="articles" key={item.id}>
            <img className="article-img" src={item.img_url} alt="" />
            <div className="article-content">
              <div className="article-para">
                <h2>{item.heading}</h2>
                <p>{item.sub_head}</p>

                <a href={item.arti_link} target="_blank">
                  {" "}
                  <button className="article-btn">Read More</button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
