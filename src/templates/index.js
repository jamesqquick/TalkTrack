import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';
import CardMetadata from '../components/CardMetadata';
const IndexPage = props => {
  const talks = props.pageContext.talks;
  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="title">My Amazing Super Cool Talks</h1>
      <ul>
        {talks.map(talk => (
          <li className="card hover" key={talk.slug}>
            <Link className="card-overlay" to={talk.slug}></Link>
            <h2 className="card-title">{talk.title}</h2>
            <CardMetadata talk={talk} />
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
