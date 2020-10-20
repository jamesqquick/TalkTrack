import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Feedback from '../components/feedback';
import SearchedTweets from '../components/searchedTweets';
import CardMetadata from '../components/CardMetadata';
export default function Talk({ pageContext: talk }) {
  return (
    <Layout>
      <SEO title={talk.title} />
      <a
        href="https://twitter.com/intent/tweet?button_hashtag=jqquicktalks"
        class="btn"
        data-show-count="false"
        style={{ marginBottom: '20px' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet #jqquicktalks
      </a>

      <div className="card relative">
        <h1 className="card-title">{talk.title}</h1>
        <CardMetadata talk={talk} includeSlides={true} />
        <p>{talk.description}</p>
      </div>
      <div className="card">
        <Feedback cardId={talk.id} />
      </div>
      <div className="card">
        <SearchedTweets />
      </div>
    </Layout>
  );
}
