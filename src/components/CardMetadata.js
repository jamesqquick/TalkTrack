import React from 'react';
import {
  faFileAlt,
  faCompass,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function talkMetadata({ includeSlides, talk }) {
  return (
    <div className="card-metadata">
      <span>
        <FontAwesomeIcon className="icon" icon={faCalendar} /> {talk.date}
      </span>
      <span className="separator">|</span>
      <span>
        <FontAwesomeIcon className="icon" icon={faCompass} />
        {talk.conference}
      </span>
      {includeSlides && (
        <>
          <span className="separator">|</span>
          <a href={talk.slides}>
            <FontAwesomeIcon className="icon" icon={faFileAlt} /> Slides
          </a>
        </>
      )}
    </div>
  );
}
