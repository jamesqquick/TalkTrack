import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

const IndexPage = props => {
  const talks = props.pageContext.talks;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>My Talks</h1>
      <p>
        Welcome to Quick Talks where I list all of my talks and give you a way
        to provide me feedback!
      </p>

      {talks.map(talk => (
        <div className="talk-preview" key={talk.slug}>
          <Link to={talk.slug}>
            <h2>{talk.title}</h2>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;
