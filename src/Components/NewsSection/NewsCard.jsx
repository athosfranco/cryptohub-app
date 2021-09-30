import React from "react";
import { Card } from "react-bootstrap";

const NewsCard = ({ author, title, date, description, image, url }) => {
  return (
    <Card className="news-card border-0">
      <Card.Body
        style={{
          backgroundColor: "#072F49",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img src={image} alt="Imagem destaque da notícia"></img>{" "}
          <Card.Title>
            <a target="_blank" rel="noreferrer" href={url}>
              {`${title} `}
            </a>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
