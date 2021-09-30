import React, { useState } from "react";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

const Header = ({ appLanguage, onGetInputData, onGetNumberOfCoinsShown }) => {
  //states
  const [fetchingCoins, setFetchingCoins] = useState(false);

  //pega valor inserido no input
  const catchInputValue = (e) => onGetInputData(e.target.value);

  //função que cuida do número de cards de moedas exibidos na página
  const listLengthHandler = (e) => {
    setFetchingCoins(true);
    e.preventDefault();
    const listLength = Number(e.target.textContent.split(" ")[1].trim());
    onGetNumberOfCoinsShown(listLength);
    setTimeout(() => {
      setFetchingCoins(false);
    }, 1000);
  };

  return (
    <>
      <div className="header-container">
        <div className="image_preview"></div>

        <h1>CryptoHub</h1>
        <p>
          {appLanguage === "pt-BR"
            ? "Tenha acesso a dados e estatísticas sobre as principais Criptomoedas do mercado."
            : "Get access to all the data about the main Cryptocoins on the market."}
        </p>

        <form>
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "#e2e2e2",
              marginRight: "10px",
              fontSize: "1.2rem",
            }}
          />
          <input
            autoFocus
            className="coin-input"
            type="text"
            placeholder="Ex.: Bitcoin, Dogecoin..."
            onChange={catchInputValue}
          ></input>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropdownButton
              id="dropdown-item-button"
              title={
                appLanguage === "pt-BR"
                  ? "Filtrar resultados"
                  : "Filter results"
              }
              variant="link"
              style={{ paddingLeft: "40px" }}
            >
              <Dropdown.Item as="button" onClick={listLengthHandler}>
                {appLanguage === "pt-BR"
                  ? "Mostrar 25 resultados"
                  : "Show 25 results"}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={listLengthHandler}>
                {appLanguage === "pt-BR"
                  ? "Mostrar 50 resultados"
                  : "Show 50 results"}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={listLengthHandler}>
                {appLanguage === "pt-BR"
                  ? "Mostrar 150 resultados"
                  : "Show 150 results"}
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={listLengthHandler}>
                {appLanguage === "pt-BR"
                  ? "Mostrar 250 resultados"
                  : "Show 250 results"}
              </Dropdown.Item>
            </DropdownButton>
            {fetchingCoins === true ? (
              <Spinner
                animation="border"
                style={{ color: "white", marginTop: "5px" }}
              />
            ) : (
              console.log("not fetching coins")
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Header;
