import React, { useEffect, useState } from "react";

export default function SearchedTweets({ hashtag }) {
  const [tweets, setTweets] = useState(null);
  useEffect(() => {
    let unhashedTag = hashtag;
    if (hashtag.startsWith("#")) {
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
    <div>
      <h2>Tweets</h2>
      {tweets != null &&
        tweets.map(tweet => (
          <div className="tweet" key={tweet.id}>
            <p>{tweet.text}</p>
            <p>by: {tweet.user.screen_name}</p>
          </div>
        ))}
    </div>
  );
}
