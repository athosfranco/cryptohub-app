import React from "react";
import CoinCard from "../CoinCard/CoinCard.jsx";
import "./CoinList.css";

const CoinList = ({ onGetCoinData, currency, filteredCoins, appLanguage }) => {
  //Pega o nome da moeda selecionada em CoinCard.jsx e envia para App.js
  // const selectedCoinHandler = (dataFromCoin) => onGetCoinData(dataFromCoin);
  const selectedCoinHandler = (dataFromCoin) => {
    onGetCoinData(dataFromCoin);
  };

  return (
    <>
      <main>
        <div className="coin-cards-container">
          <div className="cards">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => {
                return (
                  <CoinCard
                    coin={coin}
                    currency={currency}
                    appLanguage={appLanguage}
                    selectedCoin={coin.name}
                    onGetSelectedCoin={selectedCoinHandler}
                  />
                );
              })
            ) : appLanguage === "pt-BR" ? (
              <h4>Ops! Não encontramos nenhum resultado.</h4>
            ) : (
              <h4>Whops! No result found.</h4>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default CoinList;
