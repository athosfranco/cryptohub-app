import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div style={{ display: "flex" }}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/athosfranco"
        >
          <FontAwesomeIcon
            icon={faGithubSquare}
            style={{
              color: "#073654",
              fontSize: "3rem",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
        </a>

        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/athosfranco/"
        >
          {" "}
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ color: "#073654", fontSize: "3rem", cursor: "pointer" }}
          />
        </a>
      </div>

      <p>Made with ❤ by Athos Franco</p>
    </footer>
  );
};

export default Footer;
