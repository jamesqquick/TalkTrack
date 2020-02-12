import React from "react";
import { useInput } from "../components/useInput";

export default function Feedback({ cardId }) {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const { value: rating, bind: bindRating, reset: resetRating } = useInput("5");
  const {
    value: feedback,
    bind: bindFeedback,
    reset: resetFeedback,
  } = useInput("");

  const submitFeedback = async e => {
    e.preventDefault();
    console.log("submitting", email, feedback, rating);
    const feedbackBody = { email, feedback, rating, cardId };

    try {
      const url = "/.netlify/functions/addFeedback";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(feedbackBody),
      });
      if (res.status !== 200) {
        console.error("Failed to submit talk");
      } else {
        const data = await res.json();
        console.log(data);
        resetForm();
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const resetForm = () => {
    resetEmail();
    resetFeedback();
    resetRating();
  };

  return (
    <>
      <h2>Give Feedback</h2>
      <p>How else would I get better?!</p>
      <form onSubmit={submitFeedback}>
        <label htmlFor="email">Email (optional)</label>
        <input type="text" name="email" id="email" {...bindEmail} />
        <label htmlFor="feedback">What feedback do you have?</label>
        <textarea
          name="feedback"
          id="feedback"
          cols="30"
          rows="10"
          {...bindFeedback}
        ></textarea>
        <label htmlFor="rating">Rating (5 being the best)</label>
        <select name="rating" id="rating" {...bindRating}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
