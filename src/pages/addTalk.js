import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useInput } from "../components/useInput";

export default function AddTalk() {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: date, bind: bindDate, reset: resetDate } = useInput("");
  const { value: slides, bind: bindSlides, reset: resetSlides } = useInput("");
  const {
    value: conference,
    bind: bindConference,
    reset: resetConference,
  } = useInput("");
  const { value: hashtag, bind: bindHashtag, reset: resetHashtag } = useInput(
    ""
  );
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput("");

  const resetForm = () => {
    resetTitle();
    resetConference();
    resetDate();
    resetSlides();
    resetHashtag();
    resetDescription();
  };

  const submitTalk = async e => {
    const talk = { title, date, slides, conference, description, hashtag };
    e.preventDefault();
    try {
      const url = "/.netlify/functions/addTalk";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(talk),
      });
      if (res.status !== 200) {
        console.error("Failed to submit talk");
      } else {
        //const data = res.json();
        resetForm();
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Add a Talk</h1>
        <form onSubmit={submitTalk}>
          <label htmlFor="title">Talk Title</label>
          <input type="text" name="title" id="title" {...bindTitle} />
          <label htmlFor="conference">Conference</label>
          <input
            type="text"
            name="conference"
            id="conference"
            {...bindConference}
          />
          <label htmlFor="hashtag">Hashtag</label>
          <input type="text" name="hashtag" id="hashtag" {...bindHashtag} />
          <label htmlFor="date">Date</label>
          <input type="text" name="date" id="date" {...bindDate} />
          <label htmlFor="slides">Slides</label>
          <input type="text" name="slides" id="slides" {...bindSlides} />
          <label htmlFor="description">Description</label>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            {...bindDescription}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
