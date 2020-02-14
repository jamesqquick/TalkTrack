import React, { useState } from 'react';
import { useInput } from '../components/useInput';
import StarRating from './starRating';

export default function Feedback({ cardId }) {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const [rating, setRating] = useState(5);
  const {
    value: feedback,
    bind: bindFeedback,
    reset: resetFeedback,
  } = useInput('');

  const submitFeedback = async e => {
    e.preventDefault();
    console.log('submitting', email, feedback, rating);
    const feedbackBody = { email, feedback, rating, cardId };

    if (!feedback) return;

    try {
      const url = '/.netlify/functions/addFeedback';
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(feedbackBody),
      });
      if (res.status !== 200) {
        console.error('Failed to submit talk');
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
    setRating(5);
  };

  return (
    <section>
      <h2 className="section-title">How Did I Do?</h2>
      <p>
        Tell me what you thought and <strong>be honest</strong>... because how
        else would I get better?!
      </p>
      <form onSubmit={submitFeedback}>
        <label htmlFor="rating">Rating (5 being the best)</label>
        <StarRating ratingChanged={rating => setRating(rating)} />
        <label htmlFor="feedback">What feedback do you have?</label>
        <textarea
          name="feedback"
          id="feedback"
          cols="30"
          rows="10"
          {...bindFeedback}
        ></textarea>
        <label htmlFor="email">Email (optional)</label>
        <input type="text" name="email" id="email" {...bindEmail} />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
