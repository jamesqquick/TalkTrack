import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>My Talks</h1>
    <p>
      Welcome to Quick Talks where I list all of my talks and give you a way to
      provide me feedback!
    </p>
  </Layout>
);

export default IndexPage;
