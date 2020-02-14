import React, { useEffect, useState } from 'react';

export default function SearchedTweets({ hashtag }) {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    let unhashedTag = hashtag;
    if (hashtag.startsWith('#')) {
      unhashedTag = hashtag.substring(1);
    }
    const searchTweets = async () => {
      try {
        const url = `/.netlify/functions/searchTweets?hashtag=${unhashedTag}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.tweets);
        setTweets(data.tweets);
      } catch (ex) {
        console.error(ex);
      }
    };
    searchTweets();
  }, []);
  return (
    <>
      <h2>Tweets</h2>
      <div className="tweets-list">
        {tweets != null &&
          tweets.map(tweet => (
            <div className="card hover " key={tweet.id}>
              <img
                className="card-image"
                src={tweet.user.profile_image_url_https}
                alt={tweet.user.screen_name + ' image'}
              />
              <p>{tweet.text}</p>
              <a href={`https://www.twitter.com/${tweet.user.screen_name}`}>
                <p>by: {tweet.user.screen_name}</p>
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
