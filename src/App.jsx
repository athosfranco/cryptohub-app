import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import CoinList from "./Components/CoinList/CoinList.jsx";
import NavbarContainer from "./Components/Navbar/NavbarContainer.jsx";
import CoinDetails from "./Components/CoinDetails/CoinDetails";
import NewsSection from "./Components/NewsSection/NewsSection.jsx";
import windowDimension from "./windowDimension";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Footer from "./Components/Footer/Footer";

import "./App.css";

function App() {
  //Pega a dimensão da viewport
  const viewportSize = windowDimension();

  //array de moedas de conversão
  const currencies = [
    { text: "BRL (R$)", value: "brl" },
    { text: "USD (US$)", value: "usd" },
    { text: "EUR (€)", value: "eur" },
    { text: "JPY (¥)", value: "jpy" },
  ];

  //States
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [appLanguage, setAppLanguage] = useState("pt-BR");
  const [currency, setCurrency] = useState(
    navigator.language === "pt-BR" ? "brl" : "usd"
  );
  const [coinData, setCoinData] = useState(null);
  const [numberOfCoinsShown, setNumberOfCoinsShown] = useState(25);

  //Referência de scroll
  const scrollRef = useRef(null);
  const newsRef = useRef(null);

  //Executa scroll para focar no elemento em ênfase
  const scrollToTop = () => scrollRef.current.scrollIntoView();
  const scrollToNews = () => newsRef.current.scrollIntoView();

  //Define o idioma do app na inicialização
  useEffect(() => {
    navigator.language === "pt-BR"
      ? setAppLanguage("pt-BR")
      : setAppLanguage("en-US");
  }, []);

  //Altera o idioma da página
  const appLanguageHandler = (chosenLanguage) => setAppLanguage(chosenLanguage);

  //pega os dados da API sempre que a currency for atualizada
  let endpoint = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${numberOfCoinsShown}&page=1&sparkline=false`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currency, numberOfCoinsShown]);

  //Mecanismo de busca em tempo real
  const searchHandler = (inputData) => setSearch(inputData);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  //String do símbolo do valor monetário
  let currencyString = currencies
    .find((data) => data.value === currency)
    .text.split(" ")[1];

  //pega data do navdropdown
  const currencyHandler = (newCurrency) => setCurrency(newCurrency);

  //Pega a moeda selecionada pelo usuário e exibe detalhes (data liftup: CoinCard >> CoinList >> App)
  const showCoinDetailHandler = (coinName) => {
    const coinObject = coins.find((coin) => coin.name === coinName);
    setCoinData(coinObject);
    scrollToTop();
  };

  //Fecha a janela de detalhes da moeda e volta pra lista
  const closeHandler = () => setCoinData(null);

  //Pega o número de moedas a ser exibido na página (Header.jsx -> App.jsx)
  const listLengthHandler = (value) => {
    setNumberOfCoinsShown(value);
  };

  return (
    <div className="coin-app">
      <NavbarContainer
        currencies={currencies}
        currency={currency}
        appLanguage={appLanguage}
        onSetCurrency={currencyHandler}
        onSwitchLanguage={appLanguageHandler}
        viewportSize={viewportSize}
      />
      <Header
        appLanguage={appLanguage}
        onGetInputData={searchHandler}
        onGetNumberOfCoinsShown={listLengthHandler}
      />
      <div ref={scrollRef} style={{ marginBottom: "30px" }}></div>
      {coinData ? (
        <CoinDetails
          currency={currency}
          appLanguage={appLanguage}
          selectedCoin={coinData}
          onCloseCoinDetail={closeHandler}
          viewportSize={viewportSize}
        />
      ) : (
        <CoinList
          onGetCoinData={showCoinDetailHandler}
          currencies={currencies}
          currency={currency}
          currencyString={currencyString}
          filteredCoins={filteredCoins}
          appLanguage={appLanguage}
        />
      )}
      <div ref={newsRef} style={{ marginBottom: "30px" }}></div>
      <NewsSection appLanguage={appLanguage} />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
