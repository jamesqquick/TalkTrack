import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
export default function Talk({ pageContext: talk }) {
  return (
    <Layout>
      <SEO title={talk.title} />
      <div>
        <h1>{talk.title}</h1>
        <p>{talk.conference}</p>
        <p>{talk.date}</p>

        <a href={talk.slides}>
          <p>Slides</p>
        </a>
        <p>{talk.hashtag}</p>
        <p>{talk.description}</p>
      </div>
    </Layout>
  );
}
