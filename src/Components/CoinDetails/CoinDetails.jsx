import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoTag from "./InfoTag";
import LineChart from "./LineChart";
import { CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
import "./CoinDetails.css";

const CoinDetails = ({
  currency,
  appLanguage,
  selectedCoin,
  onCloseCoinDetail,
  viewportSize,
}) => {
  //states
  const [chartData, setChartData] = useState([]); //Armazena os dados 'puros' vindos da API
  const [pricesDatapoints, setPricesDatapoints] = useState([]); //Armazena os dados transformados em datapoints para alimentar o linechart
  const [coinStats, setCoinStats] = useState("");
  const [chartDataPeriod, setChartDataPeriod] = useState(1); //Controla o número de dias em exibição no gráfico
  const [intervalParameter, setIntervalParameter] = useState("hourly");

  //Handlers
  const numberOfDaysHandler = (numberOfDays) => {
    setChartDataPeriod(numberOfDays);
    if (numberOfDays > 1) setIntervalParameter("daily");
    else setIntervalParameter("hourly");
  };

  //endpoint que vai alimentar o linechart
  let endpoint = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=${currency}&days=${chartDataPeriod}&interval=${intervalParameter}`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  //atualiza automaticamente sempre que chartData é atualizado
  useEffect(() => {
    //Esse .map gera uma array com os datapoints de PREÇO
    const getPricesDatapoints = chartData?.prices?.map((priceDatapoint) => {
      //Converte o formato de tempo em UNIX para Date
      let unixTimestamp = priceDatapoint[0];
      let date = new Date(unixTimestamp);
      let formattedDate = String(date).split(" ");
      formattedDate = `${formattedDate[2]}/${formattedDate[1]}`;

      //Pega a hora correspondente
      let hour = date.toLocaleTimeString("pt-BR").split(":");
      let formattedHour = `${formattedDate} (${hour[0]}:${hour[1]})`;

      //Pega o preço e o converte para formato legível pelo usuário
      let priceAtCurrentTime = priceDatapoint[1].toLocaleString("pt-BR", {
        maximumFractionDigits: 2,
      });
      return [formattedDate, formattedHour, priceAtCurrentTime, priceDatapoint];
    });

    setPricesDatapoints(getPricesDatapoints);
  }, [chartData]);

  //Fecha e volta pra lista
  const closeCoinDetail = () => onCloseCoinDetail(null); //Envia 'null' como valor para App

  //endpoint que vai alimentar os dados atuais da moeda
  let endpoint_2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false`;

  useEffect(() => {
    axios
      .get(endpoint_2)
      .then((response) => {
        const requestedCoin = response.data.find((coin) => {
          return coin.id === selectedCoin.id;
        });
        setCoinStats(requestedCoin);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [currency, appLanguage]);

  return (
    <div className="coin-details-container">
      <div className="coin-details-name-container">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={coinStats?.image} alt="" />
          <h2>
            {coinStats?.name} ({coinStats?.symbol?.toUpperCase()})
          </h2>
        </div>
        <CloseButton variant="white" onClick={closeCoinDetail} />
      </div>
      <div className="coin-details-price-container">
        <h3>
          {currency.toUpperCase()}{" "}
          {`${coinStats?.current_price?.toLocaleString(appLanguage, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} `}
        </h3>
        <h4
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          {selectedCoin.price_change_percentage_24h > 0 ? (
            <FontAwesomeIcon
              icon={faAngleDoubleUp}
              style={{ color: "#2cb362", margin: "0px 8px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleDoubleDown}
              style={{ color: "#bd5e74", margint: "0px 8px" }}
            />
          )}
          {selectedCoin.price_change_percentage_24h > 0 ? (
            <p
              style={{
                color: "#2cb362",
                marginBottom: "0",
              }}
            >
              {selectedCoin.price_change_percentage_24h.toFixed(2)}%
              <span> (24h)</span>
            </p>
          ) : (
            <p style={{ color: "#bd5e72", marginBottom: "0" }}>
              {selectedCoin.price_change_percentage_24h.toFixed(2)}%
              <span> (24h)</span>
            </p>
          )}
        </h4>
      </div>
      <div className="coin-details-statistics-container">
        <InfoTag
          className="info-container"
          textInPt="Posição"
          textInEn="Rank"
          currency={""}
          value={coinStats?.market_cap_rank}
          appLanguage={appLanguage}
          tagDescriptionPt="Qual lugar essa moeda ocupa no ranking de criptomoedas (baseado no valor atual do preço)."
          tagDescriptionEn="Which position this cryptocurrency is on the price ranking of all cryptocurrencies."
        />
        <InfoTag
          className="info-container"
          textInPt="Capitalização de Mercado"
          textInEn="Market Cap"
          currency={currency}
          value={coinStats.market_cap}
          appLanguage={appLanguage}
          tagDescriptionPt="É o valor total de todas as moedas mineradas. É calculada multiplicando o número de moedas em circulação pelo atual preço de mercado de uma só moeda."
          tagDescriptionEn="Refers to the total market value of a cryptocurrency's circulating supply. (Market Cap = Current Price x Circulating Supply)"
        />
        <InfoTag
          className="info-container"
          textInPt="PMAR"
          textInEn="ATH"
          currency={currency}
          value={coinStats.ath}
          appLanguage={appLanguage}
          tagDescriptionPt="PMAR = Preço Mais Alto Registrado. É o valor mais alto que essa criptomoeda já alcançou desde que entrou em circulação."
          tagDescriptionEn="All-time High (ATH). It's the highest price value this coin ever had since it first started circulating."
        />
        <InfoTag
          className="info-container"
          textInPt="PMBR"
          textInEn="ATL"
          currency={currency}
          value={coinStats.atl}
          appLanguage={appLanguage}
          tagDescriptionPt="PMBR = Preço Mais Baixo Registrado. É o valor mais baixo que essa criptomoeda já alcançou desde que entrou em circulação."
          tagDescriptionEn="All-time Low (ATL). It's the lowest price value this coin ever had since it first started circulating."
        />
        <InfoTag
          className="info-container"
          textInPt="Fornecimento Circulante"
          textInEn="Circulating Supply"
          currency={""}
          value={coinStats.circulating_supply}
          appLanguage={appLanguage}
          tagDescriptionPt="É a quantidade de moedas que estão em circulação no mercado nesse exato momento, que podem ser negociadas pelo público."
          tagDescriptionEn="The amount of coins that are circulating in the market and are tradeable by the public."
        />
        <InfoTag
          className="info-container"
          textInPt="Volume Total"
          textInEn="Total Volume"
          currency={currency}
          value={coinStats.total_volume}
          appLanguage={appLanguage}
          tagDescriptionPt="Uma medida do volume de negociação total desta criptomeda em todas as plataformas rastreadas nas últimas 24 horas. Esse valor é rastreado continuamente, sem horário de abertura e/ou fechamento."
          tagDescriptionEn="A measure of a cryptocurrency trading volume across all tracked platforms in the last 24 hours. This is tracked on a rolling 24-hour basis with no open/closing times."
        />
        <InfoTag
          className="info-container"
          textInPt="Avaliação totalmente diluída"
          textInEn="Fully Diluted Valuation"
          currency={currency}
          value={coinStats.fully_diluted_valuation}
          appLanguage={appLanguage}
          tagDescriptionPt="Pode ser definido como a capitalização de mercado do projeto, uma vez que a equipe de desenvolvimento da moeda tenha emitido o número máximo possível de fichas. Em outras palavras, é um método de calcular a capitalização de mercado futura de um projeto. Podem levar vários anos até que essa previsão seja alcançada. Se este estiver vazio, não há informações suficientes para calcular este valor."
          tagDescriptionEn="The market capitalization (valuation) if the max supply of a coin is in circulation. Note that it can take 3, 5, 10 or more years before the FDV can be reached, depending on how the emission schedule is designed. If its empty, the FDV is still null."
        />
      </div>

      <LineChart
        pricesDatapoints={pricesDatapoints}
        currency={currency}
        appLanguage={appLanguage}
        onGetDays={numberOfDaysHandler}
        selectedCoin={selectedCoin}
        viewportSize={viewportSize}
      />
    </div>
  );
};

export default CoinDetails;
