import { useState, useEffect } from "react";
import axios from "axios";
import ArticleList from "./ArticleList";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchArticles() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "<https://hn.algolia.com/api/v1/items/:1>"
        );
        setArticles(response.data.hits);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {isLoading && <p>Loading data, please wait...</p>}
      {error && <p>Something went wrong! Please try reloading this page!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;
