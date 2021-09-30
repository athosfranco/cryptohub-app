import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";

const LineChart = ({
  pricesDatapoints,
  currency,
  appLanguage,
  onGetDays,
  selectedCoin,
  viewportSize,
}) => {
  //Price Data
  const prices = pricesDatapoints?.map((datapoints) => datapoints[3]);
  const pricesHours = pricesDatapoints?.map((datapoints) => datapoints[1]);

  //linechart label string
  const datasetLabelPt = `Preço da ${
    selectedCoin.name
  } (1 ${selectedCoin.symbol.toUpperCase()} convertido para ${currency.toUpperCase()})`;
  const datasetLabelEn = `${
    selectedCoin.name
  } Price (1 ${selectedCoin.symbol.toUpperCase()} converted to ${currency.toUpperCase()})`;

  //Configurações do linechart
  const priceData = {
    labels: pricesHours,
    datasets: [
      {
        data: prices,
        fill: true,
        backgroundColor: "rgba(0, 255, 68, 0.1)",
        borderColor: "#2cb362",
        pointBackgroundColor: "#2cb362",
        pointBorderColor: "#00ff44",
        label: appLanguage === "pt-BR" ? datasetLabelPt : datasetLabelEn,
      },
    ],
  };

  //Atualiza o intervalo temporal exibido no gráfico
  const updateNumberOfDays = (e) => onGetDays(e.target.value);

  //

  const buttonStyle = { backgroundColor: "#4E7393", border: "0px" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <ButtonGroup aria-label="time-period">
          <Button
            style={buttonStyle}
            variant="secondary"
            onClick={updateNumberOfDays}
            value={1}
          >
            24hrs
          </Button>
          <Button
            style={buttonStyle}
            variant="secondary"
            onClick={updateNumberOfDays}
            value={6}
          >
            7d
          </Button>
          <Button
            style={buttonStyle}
            variant="secondary"
            onClick={updateNumberOfDays}
            value={29}
          >
            30d
          </Button>
          <Button
            style={buttonStyle}
            variant="secondary"
            onClick={updateNumberOfDays}
            value={89}
          >
            90d
          </Button>
          <Button
            style={buttonStyle}
            variant="secondary"
            onClick={updateNumberOfDays}
            value={364}
          >
            365d{" "}
          </Button>
        </ButtonGroup>
      </div>

      <Line
        data={priceData}
        width={viewportSize.width <= 769 ? "300px" : "1000px"}
        height={viewportSize.width <= 769 ? "200px" : "400px"}
      />
    </div>
  );
};

export default LineChart;
