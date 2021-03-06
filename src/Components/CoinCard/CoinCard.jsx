import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button } from "react-bootstrap";
import { faAngleDoubleUp, faAngleDoubleDown, faChartLine } from "@fortawesome/free-solid-svg-icons";
import InfoTag from "../CoinDetails/InfoTag.jsx";

const CoinCard = ({ coin, currency, appLanguage, onGetSelectedCoin }) => {
  //envia 'selectedCoin' pra CoinList
  const selectedCoinHandler = (e) => {
    const selectedCoin = e.target.parentNode.parentNode.parentNode.firstChild.textContent.split("(")[0].trim();
    onGetSelectedCoin(selectedCoin);
  };

  return (
    <div value={coin.id} className="card">
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <img src={coin.image} alt=""></img>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <span style={{ fontSize: "24px" }}>{coin.name}</span>
              <span className="mb-2 text-muted">({coin.symbol.toUpperCase()})</span>
            </div>
          </div>
          <p className="card-rank">#{coin?.market_cap_rank}</p>
        </div>

        <span className="card-price">
          {`${currency.toUpperCase()} `}
          {`${coin.current_price.toLocaleString(appLanguage, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} `}
          {coin.price_change_percentage_24h > 0 ? (
            <p className="card-price-up">
              <FontAwesomeIcon icon={faAngleDoubleUp} style={{ color: "#2cb362", margin: "0px 8px" }} />
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className="card-price-down">
              <FontAwesomeIcon icon={faAngleDoubleDown} style={{ color: "#bd5e74", margin: "0px 8px" }} />
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InfoTag
            className="info-container-card"
            textInPt="Capitaliza????o de Mercado"
            textInEn="Market Cap"
            currency={currency}
            value={coin.market_cap}
            appLanguage={appLanguage}
            tagDescriptionPt="?? o valor total de todas as moedas mineradas. ?? calculada multiplicando o n??mero de moedas em circula????o pelo atual pre??o de mercado de uma s?? moeda."
            tagDescriptionEn="Refers to the total market value of a cryptocurrency's circulating supply. (Market Cap = Current Price x Circulating Supply)"
          />
          <InfoTag
            className="info-container-card"
            textInPt="Volume Total"
            textInEn="Total Volume"
            currency={currency}
            value={coin.total_volume}
            appLanguage={appLanguage}
            tagDescriptionPt="Uma medida do volume de negocia????o total desta criptomeda em todas as plataformas rastreadas nas ??ltimas 24 horas. Esse valor ?? rastreado continuamente, sem hor??rio de abertura e/ou fechamento."
            tagDescriptionEn="A measure of a cryptocurrency trading volume across all tracked platforms in the last 24 hours. This is tracked on a rolling 24-hour basis with no open/closing times."
          />
          <Button
            style={{
              width: "95%",
              margin: "0 auto",
              backgroundColor: "#072F49",
              border: "none",
              padding: "1rem",
            }}
            onClick={selectedCoinHandler}
          >
            <FontAwesomeIcon icon={faChartLine} style={{ fontSize: "1.2rem", margin: "0px 8px" }} />
            {appLanguage === "pt-BR" ? "Mostrar Detalhes" : "Show Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
