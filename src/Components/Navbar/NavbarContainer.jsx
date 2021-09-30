import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "./NavbarContainer.css";

const NavbarContainer = ({
  currencies,
  currency,
  onSetCurrency,
  onSwitchLanguage,
  appLanguage,
  viewportSize,
}) => {
  //Altera a moeda de conversão
  const currencyHandler = (e) => {
    const newCurrency = currencies.find(
      (currency) => currency.text === e.target.text
    );
    onSetCurrency(newCurrency.value);
  };

  //states
  const [navbarBgColor, setNavbarBgColor] = useState("rgba(7, 38, 60, 0)");

  //Torna a navbar sólida com scroll
  const scrollHandler = (e) => {
    window.scrollY > 250
      ? setNavbarBgColor("#041a29")
      : setNavbarBgColor("rgba(7, 38, 60, 0)");
  };
  window.addEventListener("scroll", scrollHandler);

  //envia o valor do input do idioma escolhido para App.js
  const switchLanguage = (e) => {
    onSwitchLanguage(e.target.text.includes("PT-BR") ? "pt-BR" : "en-US");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      fixed="top"
      style={{
        backgroundColor: viewportSize.width <= 760 ? "#041a29" : navbarBgColor,
        transition: "0.5s ease",
        width: "100%",
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Item
              className="nav-item"
              onClick={navHandler}
              value={"cripto"}
            >
              {appLanguage === "pt-BR" ? "Criptomoedas" : "Cryptocurrencies"}
            </Nav.Item>
            <Nav.Item className="nav-item" onClick={navHandler} value={"news"}>
              {appLanguage === "pt-BR" ? "Notícias" : "News"}
            </Nav.Item>
          </Nav> */}
          <Nav className="m-auto">
            <NavDropdown
              title={`${
                appLanguage === "pt-BR"
                  ? "Moeda de Conversão"
                  : "Conversion Currency"
              } (${currency.toUpperCase()})`}
              id="currency-nav-dropdown"
            >
              {currencies.map((currency) => {
                return (
                  <NavDropdown.Item
                    onClick={currencyHandler}
                    key={currency.text}
                  >
                    {currency.text}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown
              title={`${
                appLanguage === "pt-BR" ? "Mudar Idioma" : "Change Language"
              } (${appLanguage.toUpperCase()})`}
              id="language-nav-dropdown"
            >
              <NavDropdown.Item onClick={switchLanguage}>
                {"Português (PT-BR)"}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={switchLanguage}>
                {"English (EN-US)"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarContainer;
