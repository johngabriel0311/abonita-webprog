import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Button from "../../components/Button";

import { fetchArticles } from "../../services/ArticleService";

function ArticlePage() {
  const { name } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    loadArticle();
  }, [name]);

  const loadArticle = async () => {
    try {
      const { data } = await fetchArticles();

      const found = (data.articles || []).find((a) => a.slug === name);

      setArticle(found);
    } catch (error) {
      console.error(error);
    }
  };

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-zinc-900">
              Article not found
            </h1>

            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 min-h-screen text-zinc-900">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <Button to="/articles">Back to Articles</Button>

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          ELEMENT
        </p>

        <h1 className="text-3xl font-bold mt-2">
          {article.slug
            ?.split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>

        <p className="mt-2 text-sm text-zinc-500">{article.title}</p>
      </div>

      <div className="border-t-2 border-zinc-900 mt-6"></div>

      <div className="border-t-2 border-zinc-900 mt-1"></div>

      <div className="max-w-4xl mx-auto px-6 py-10 text-center">
        {article.image && (
          <img
            src={`http://localhost:8000/uploads/${article.image}`}
            alt={article.title}
            className="w-full h-[480px] object-cover rounded-2xl border-2 border-zinc-900"
          />
        )}

        <div className="mt-6 space-y-4 text-left">
          {article.content?.split("\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-7 text-zinc-700 whitespace-pre-wrap"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 border-t-2 border-zinc-900 pt-6 flex justify-start">
          <Button to="/articles">Back to Articles</Button>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
