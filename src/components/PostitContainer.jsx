import React, { useEffect, useState } from 'react';
import withRouter from '../hooks/withRouter';
import { useDispatch, useSelector } from 'react-redux'
import { getWorkspace } from '../redux/workspaceSlice'

import Footer from './Footer';
import useComponentVisible from './useComponentVisible';
import PostIt from './Postit';
import PostIts from './Postits';

import './PostitContainer.css'

const PostitContainer = ({ router: { params, navigate } }) => {
  const dispatch = useDispatch()
  const { data: { name, description, postits }, status, loading, error } = useSelector((state) => state.workspace)

  const [loadPostits, setLoadPostits] = useState(true);
  const [resetNew, setResetNew] = useState(false);

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useComponentVisible(setIsComponentVisible);

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
    (!loading & !error) ? (
      <>
        <div className='postit-container_container'>
          <div className='postit-container'>
            <h1 className="postit-container__header">{name || "Simple Post-its"}</h1>
            <p>{description}</p>
            <div ref={ref} className="postit-container__new-postit">
              <PostIt
                callback={() => setLoadPostits(true)}
                postit={initPostit}
                newPostit={true}
                hide={!isComponentVisible}
                setHide={setIsComponentVisible}
                resetNewPostit={resetNew}
                {...params}
              />
            </div>
            <PostIts postits={postits} {...params} />
          </div>
        </div>
      <Footer plusClick={() => setIsComponentVisible(true)} />
    </>
  ) : <></>
  );
};

export default withRouter(PostitContainer);
