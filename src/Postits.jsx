import React, { useEffect, useState } from 'react';

import Postit from './Postit';

import './Postits.css';

const PostIts = ({ callback, workspaceId, postits = [] }) => {
  const [currentPostits, setCurrentPostits] = useState(postits);

  useEffect(() => {
    if (postits !== currentPostits) {
      setCurrentPostits(postits);
    }
  });

  return (
    <ul className="postits">
      {currentPostits.map((postit) => {
        return (
          <li key={postit.id} className="postits-item">
            <Postit postit={postit} className="postits-item__postit" workspaceId={workspaceId} callback={callback} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostIts;
