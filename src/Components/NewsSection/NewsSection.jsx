import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import NewsCard from "./NewsCard";
import axios from "axios";
import "./NewsSection.css";

const NewsSection = ({ appLanguage }) => {
  //State
  const [newsfeed, setNewsfeed] = useState([]);
  const [numberOfNewsBeingShown, setNumberOfNewsBeingShown] = useState(4);
  const [showMoreNewsDisplay, setShowMoreNewsDisplay] = useState("in-line");

  //Manipulação de datas
  let date = new Date();
  let today = date.toISOString().slice(0, 10);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  yesterday = yesterday.toISOString().slice(0, 10);

  //fetch de notícias pelo endpoint
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${
          appLanguage === "pt-BR" ? "criptomoedas" : "cryptocurrency"
        }&from=${yesterday}&to=${today}&sortBy=popularity&apiKey=52318b9641b24216952426d6b33d447c`
      )
      .then((response) => {
        const newsfeedArray = response.data.articles;
        if (newsfeedArray.length > 16) newsfeedArray.length = 16;
        setNewsfeed(newsfeedArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [appLanguage]);

  //Botão de 'mostrar mais...'
  const showMoreNewsHandler = () => {
    numberOfNewsBeingShown < newsfeed.length
      ? setNumberOfNewsBeingShown(numberOfNewsBeingShown + 4)
      : setShowMoreNewsDisplay("none");
  };

  return (
    <div className="news-section-container">
      <h2>{appLanguage === "pt-BR" ? "Últimas Notícias" : "Latest News"}</h2>

      <div className="news-container">
        {/* 
                <div className="cards-container">
          {filteredCoins.map((coin) => {
            return (
              <CoinCard
                coin={coin}
                currency={currency}
                appLanguage={appLanguage}
                selectedCoin={coin.name}
                onClick={selectedCoinHandler}
              />
            );
          })}
        </div>
        
        */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {newsfeed
            .filter((item, index) => index < numberOfNewsBeingShown)
            .map((news) => {
              return (
                <NewsCard
                  image={news.urlToImage}
                  author={news.source.name}
                  title={news.title}
                  description={news.description}
                  url={news.url}
                />
                // <div className="news" key={news.title}>
                //   <div className="news-desc-container">
                //     <img src={news.urlToImage} alt="" className="news-img" />
                //     <h4 className="news-headline">
                //       {`${news.title} `}
                //       <FontAwesomeIcon icon={faExternalLinkAlt} />
                //     </h4>
                //     <h6 className="news-author">{`${news.source.name} - ${news.publishedAt}`}</h6>
                //     <p className="news-desc">
                //       {`${news.description.slice(0, 90)}[...]`}
                //     </p>
                //   </div>
                // </div>
              );
            })}
        </div>
      </div>
      <Button
        style={{ display: `${showMoreNewsDisplay}` }}
        variant="link"
        onClick={showMoreNewsHandler}
      >
        {appLanguage === "pt-BR" ? "Mostrar mais..." : "Show More..."}
      </Button>
    </div>
  );
};

export default NewsSection;
