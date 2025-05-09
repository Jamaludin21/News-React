import React, { useCallback, useEffect, useState } from "react";
import { List, Card, Col, Row } from "antd";
import NewsItem from "./itemNews";
import { fetchNews } from "../api/apiFetch";

const NewsList = ({ query, categoryID, countryID }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [readArticles, setReadArticles] = useState(() => {
    return JSON.parse(localStorage.getItem("readArticles")) || [];
  });

  const [skeletonCount, setSkeletonCount] = useState(12); // default

  useEffect(() => {
    const calculateSkeletonCount = () => {
      const viewportHeight = window.innerHeight;
      const cardHeight = 250; // Estimate or measure this value
      const rows = Math.ceil(viewportHeight / cardHeight);
      const columns = 3; // Match your grid column count
      setSkeletonCount(rows * columns);
    };

    calculateSkeletonCount();
    window.addEventListener("resize", calculateSkeletonCount);

    return () => {
      window.removeEventListener("resize", calculateSkeletonCount);
    };
  }, []);

  const handleMarkAsRead = (newReadArticle) => {
    if (!readArticles.includes(newReadArticle)) {
      const updatedReadArticles = [...readArticles, newReadArticle];
      setReadArticles(updatedReadArticles);
      localStorage.setItem("readArticles", JSON.stringify(updatedReadArticles));
    }
  };

  const getNews = useCallback(async () => {
    setLoading(true);
    const articlesData = await fetchNews(query, categoryID, countryID);

    if (!articlesData || !articlesData.articles) {
      setNews([]);
      setLoading(false);
      return;
    }

    const filteredArticles = articlesData?.articles.filter(
      (article) => article.title !== "[Removed]"
    );
    setNews(filteredArticles);
    setLoading(false);
  }, [query, categoryID, countryID]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  const loadingSkeletons = Array.from({ length: skeletonCount }).map(
    (_, index) => (
      <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
        <Card loading />
      </Col>
    )
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return loading ? (
    <Row gutter={[16, 16]}>{loadingSkeletons}</Row>
  ) : (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      pagination={{
        current: currentPage,
        onChange: handlePageChange,
        align: "center",
        defaultPageSize: 15,
        pageSizeOptions: [15, 30, 60, 120],
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
