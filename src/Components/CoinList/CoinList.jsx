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
            {filteredCoins.map((coin) => {
              return (
                <CoinCard
                  coin={coin}
                  currency={currency}
                  appLanguage={appLanguage}
                  selectedCoin={coin.name}
                  onGetSelectedCoin={selectedCoinHandler}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default CoinList;
