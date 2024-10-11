import React from "react";
import { Card, Flex, Typography, Badge } from "antd";
import faultImage from "./../assets/No_Image_Available.jpg";

const NewsItem = ({ news, readArticles, onMarkAsRead }) => {
  const { author, title, description, publishedAt, url, urlToImage, source } =
    news;
  const { name } = source;

  const dateSplit = publishedAt.split("T");
  const dayDate = dateSplit[0];
  const isAlreadyRead = readArticles.some((article) => article.url === url);

  const handleNewsClick = () => {
    window.open(url, "_blank");

    if (!isAlreadyRead) {
      const newReadArticle = { title, url, urlToImage };
      readArticles.push(newReadArticle);
      onMarkAsRead(newReadArticle);
    }
  };

  const cardContent = (
    <Card
      hoverable
      cover={
        <div
          style={{
            backgroundImage: `url(${urlToImage || faultImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 250,
          }}
        />
      }
      onClick={handleNewsClick}
    >
      <Flex gap={16} vertical>
        <Card.Meta
          title={title}
          {...(!isAlreadyRead && { description: description })}
        />
        {!isAlreadyRead && (
          <Flex vertical gap={4}>
            {author && (
              <Typography.Text strong>Author: {author}</Typography.Text>
            )}
            {name && <Typography.Text strong>Source: {name}</Typography.Text>}
            <Typography.Text>Published: {dayDate}</Typography.Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );

  return isAlreadyRead ? (
    <Badge.Ribbon text="Read" color="green" placement="start">
      {cardContent}
    </Badge.Ribbon>
  ) : (
    cardContent
  );
};

export default NewsItem;
