import React, { useEffect, useState } from 'react';
import withRouter from '../hooks/withRouter';
import { useDispatch, useSelector } from 'react-redux'
import { getWorkspace } from '../redux/workspaceSlice'

import useComponentVisible from './useComponentVisible';
import PostIt from './Postit';
import PostIts from './Postits';

import './PostitContainer.css'

const PostitContainer = ({ router: { params, navigate } }) => {
  const dispatch = useDispatch()
  const { data: postits, status } = useSelector((state) => state.workspace)

  const [loadPostits, setLoadPostits] = useState(true);
  const [resetNew, setResetNew] = useState(false);

  const { ref, isComponentVisible } = useComponentVisible(true);

  const initPostit = {
    title: '',
    description: '',
    done: false
  };

  useEffect(() => {
    if (status === 204) {
      navigate('/')
    }
  }, [status])

  useEffect(() => {
    dispatch(getWorkspace(params))
  }, [dispatch, params])

  useEffect(() => {
    if (loadPostits) {
      setLoadPostits(false);
      setResetNew(true);
    } else {
      setResetNew(false);
    }
  }, [loadPostits]);

  return (
    <>
      <h1 className="postit-container__header">Simple Post-its</h1>
      <div ref={ref}>
        <PostIt
          callback={() => setLoadPostits(true)}
          postit={initPostit}
          newPostit={true}
          hide={!isComponentVisible}
          resetNewPostit={resetNew}
          {...params}
        />
      </div>
      <PostIts postits={postits} {...params} />
    </>
  );
};

export default withRouter(PostitContainer);
