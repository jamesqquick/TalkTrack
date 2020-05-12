import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';

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
      <ul>
        {talks.map(talk => (
          <li className="card hover" key={talk.slug}>
            <Link to={talk.slug}>
              <p>
                <strong>{talk.conference}</strong>
                <small className="card-date"> ({talk.date})</small>
              </p>
              <h2 className="card-title">{talk.title}</h2>
              <p className="card-desc">{talk.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default IndexPage;
