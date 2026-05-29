import { Link } from "react-router-dom";

import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article._id}
          className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
        >
          {article.image && (
            <img
              src={`https://abonita-webprog-server.vercel.app/uploads/${article.image}`}
              alt={article.title}
              className="aspect-4/3 w-full object-cover rounded-[1.25rem]"
            />
          )}

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Element {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {article.slug
              ?.split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {article.content?.substring(0, 150)}
            ...
          </p>

          <Link to={`/articles/${article.slug}`}>
            <Button className="mt-4">Read More</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
