import React, { useState, useEffect} from "react"
import Axios from "axios"
import News from "./News"
import "./NewsList.css"

const NewsList = () => {
      const [news, setNews] = useState([])

  useEffect(() => {
    fetchArticles();
  }, []);

const fetchArticles = async () => {
  const response = await fetch(
    " https://saurav.tech/NewsAPI/top-headlines/category/general/us.json"
  );
  const data = await response.json();
  console.log(data.articles);
  setNews(data.articles);
};



let newsArr = news.splice(0, 5)
console.log(newsArr)



  return (
      <>
       <div classsName="data-week-title">
              <h1>Breaking News & Top Stories</h1>
            </div>
    <div>
      {newsArr.map((article) => (
          
        <div className="news">
            
          <div className="article">
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}{" "}
            </a>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default NewsList