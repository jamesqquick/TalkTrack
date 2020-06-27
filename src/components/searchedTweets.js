import React, { useEffect, useState } from 'react';

export default function SearchedTweets() {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    const searchTweets = async () => {
      try {
        const url = `/.netlify/functions/searchTweets`;
        const res = await fetch(url);
        const data = await res.json();
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
        {tweets !== null && tweets.length === 0 && (
          <p>Someone needs to go tweet something!!!</p>
        )}
        {tweets != null &&
          tweets.map(tweet => (
            <div className="tweet" key={tweet.id}>
              <img
                className="tweet-image"
                src={tweet.user.profile_image_url_https}
                alt={tweet.user.screen_name + ' image'}
              />
              <div className="tweet-content">
                <a href={`https://www.twitter.com/${tweet.user.screen_name}`}>
                  <p className="tweet-user">@{tweet.user.screen_name}</p>
                  <p className="tweet-text">{tweet.text}</p>
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
