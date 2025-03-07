import React, { useEffect, useState } from "react";
import { List, Card, Col, Row } from "antd";
import NewsItem from "./itemNews";
import { fetchNews } from "../api/apiFetch";

const NewsList = ({ query, countryID }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [readArticles, setReadArticles] = useState(
    JSON.parse(localStorage.getItem("readArticles")) || []
  );

  const handleMarkAsRead = (newReadArticle) => {
    const updatedReadArticles = [...readArticles, newReadArticle];
    setReadArticles(updatedReadArticles);
    localStorage.setItem("readArticles", JSON.stringify(updatedReadArticles));
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const articlesData = await fetchNews(query, countryID);

      const filteredArticles = articlesData?.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setNews(filteredArticles);
      setLoading(false);
    };
    getNews();
  }, [query, countryID]);

  const loadingSkeletons = Array.from({ length: 9 }).map((_, index) => (
    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
      <Card loading />
    </Col>
  ));

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return loading || !news ? (
    <Row gutter={[16, 16]}>{loadingSkeletons}</Row>
  ) : (
    <List
      grid={{ gutter: 16, column: 3 }}
      pagination={{
        current: currentPage,
        onChange: handlePageChange,
        align: "center",
      }}
      dataSource={news}
      renderItem={(item) => (
        <List.Item>
          <NewsItem
            news={item}
            readArticles={readArticles}
            onMarkAsRead={handleMarkAsRead}
          />
        </List.Item>
      )}
    />
  );
};

export default NewsList;
