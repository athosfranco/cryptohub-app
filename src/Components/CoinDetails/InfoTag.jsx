import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Popover, OverlayTrigger } from "react-bootstrap";

//InfoTag.jsx é cada uma das 'tags' contendo informações sobre a moeda.
const InfoTag = ({
  className,
  textInPt,
  textInEn,
  value,
  appLanguage,
  currency,
  tagDescriptionPt,
  tagDescriptionEn,
}) => {
  const classes = `${className}`;
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h4" style={{ color: "black" }}>
        {appLanguage === "pt-BR" ? textInPt : textInEn}
      </Popover.Header>
      <Popover.Body>
        {appLanguage === "pt-BR" ? tagDescriptionPt : tagDescriptionEn}
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={classes}>
      <OverlayTrigger trigger="hover" placement="top" overlay={popover}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{appLanguage === "pt-BR" ? textInPt : textInEn}</p>
          <FontAwesomeIcon
            icon={faInfoCircle}
            style={{ color: "#537895", marginRight: "10px" }}
          />
        </div>
      </OverlayTrigger>
      <p className="info-value">
        {`${currency?.toUpperCase()} `}
        {currency
          ? value?.toLocaleString(appLanguage, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : value?.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}
      </p>
    </div>
  );
};

export default InfoTag;
