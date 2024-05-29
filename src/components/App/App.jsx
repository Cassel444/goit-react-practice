import "./App.css";
import { useEffect, useState } from "react";
import ArticleList from "../ArticleList/ArticleList";
import Error from "../Error/Error";
import SearchForm from "../SearchForm/SearchForm";
import { InfinitySpin } from "react-loader-spinner";
import fetchArticlesWithTopic from "../../articles-api";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchArticlesWithTopic(searchQuery, page);
        setArticles((prevArticles) => {
          return [...prevArticles, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [searchQuery, page]);

  function handleLoadMore() {
    setPage(page + 1);
  }

  function handleSearch(newQuery) {
    setSearchQuery(newQuery);
    setPage(1);
    setArticles([]);
  }

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <h1>Latest articles</h1>

      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
      {articles.length > 0 && !loading && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
      {loading && (
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      )}
    </div>
  );
};
export default App;
