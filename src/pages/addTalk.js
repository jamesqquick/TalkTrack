import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { useInput } from '../components/useInput';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export default function AddTalk() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const logToken = async () => {
      console.log(await getAccessTokenSilently());
    };
    logToken();
  }, []);

  const { value: title, bind: bindTitle, reset: resetTitle } = useInput('');
  const { value: date, bind: bindDate, reset: resetDate } = useInput('');
  const { value: slides, bind: bindSlides, reset: resetSlides } = useInput('');
  const {
    value: conference,
    bind: bindConference,
    reset: resetConference,
  } = useInput('');

  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput('');

  const resetForm = () => {
    resetTitle();
    resetConference();
    resetDate();
    resetSlides();
    resetDescription();
  };

  const submitTalk = async (e) => {
    console.log('submitting');
    const talk = { title, date, slides, conference, description };
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const url = '/.netlify/functions/addTalk';
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(talk),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status !== 200) {
        console.error('Failed to submit talk');
      } else {
        //const data = res.json();
        resetForm();
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <SEO title="Add Talk" />
        <div>
          <h1 className="title">Add a Talk</h1>

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
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
