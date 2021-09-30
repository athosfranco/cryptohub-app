import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const ScrollToTop = () => {
  //states
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkScrollVisibility = () => {
    if (!showScroll && window.pageYOffset > 600) setShowScroll(true);
    else if (showScroll && window.pageYOffset <= 600) setShowScroll(false);
  };

  window.addEventListener("scroll", checkScrollVisibility);

  return (
    <Button
      style={{
        display: !showScroll ? "none" : "initial",
        position: "fixed",
        bottom: "0",
        right: "0",
        margin: "1rem 1.5rem",
        cursor: "default",
      }}
      className="scroll-button"
      onClick={scrollToTopHandler}
    >
      <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
    </Button>
  );
};

export default ScrollToTop;
