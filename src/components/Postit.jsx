import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { save, update, remove } from '../redux/workspaceSlice'
import { postPostit, patchPostit, deletePostit } from '../redux/postitSlice'

import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import { omit, isEqual } from 'lodash';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import useComponentVisible from './useComponentVisible';

import './Postit.css';

const Postit = ({
  postit,
  callback,
  className = '',
  newPostit = false,
  resetNewPostit = false,
  hide = true,
  setHide,
  omitKeys = ['id', 'created_at', 'updated_at'],
  workspaceId
}) => {
  const dispatch = useDispatch()
  const [currentPostit, setCurrentPostit] = useState(omit(postit, omitKeys));
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useComponentVisible(setIsComponentVisible);
  const [prevFocus, setPrevFocus] = useState(false);

  useEffect(() => {
    if (newPostit && resetNewPostit) {
      setCurrentPostit(omit(postit, omitKeys));
    }
  }, [resetNewPostit, newPostit, postit, omitKeys]);

  // autosave
  useEffect(() => {
    setPrevFocus(isComponentVisible);
    // check it was in focus and now isn't
    if (prevFocus && !isComponentVisible) {
      // has the postit changed?
      if (!isEqual(currentPostit, omit(postit, omitKeys))) {
        // new or edit?
        if (newPostit) {
          dispatch(save(currentPostit))
          dispatch(postPostit({currentPostit, workspaceId}))
        } else {
          dispatch(update({...currentPostit, id: postit.id}))
          dispatch(patchPostit({postit, currentPostit, workspaceId}))
        }
        if (newPostit && callback) {
          callback();
        }
      }
    }
  }, [isComponentVisible]);

  const handleDeletePostit = () => {
    dispatch(remove(postit))
    dispatch(deletePostit({postit}))
    if (callback) {
      callback();
    }
  }

  return (
    <div ref={ref} className={classNames(className, 'postit', {
      'postit__new-postit': newPostit,
      'postit__new-postit-focus': newPostit && !hide
    })}>
      <form onClick={() => (newPostit ? setHide(true) : null)}>
        {!newPostit && <IoMdCloseCircleOutline onClick={handleDeletePostit} className="postit-close" />}
        <TextareaAutosize
          className="postit-title"
          type="text"
          placeholder={!newPostit || !hide ? 'Some catchy title' : ''}
          maxLength="75"
          value={currentPostit.title}
          onChange={(e) => setCurrentPostit({ ...currentPostit, title: e.target.value })}
        />
        <TextareaAutosize
          className="postit-description"
          type="text"
          placeholder={!newPostit || !hide ? 'What you want to write ...' : ''}
          minRows={6}
          value={currentPostit.description}
          onChange={(e) => setCurrentPostit({ ...currentPostit, description: e.target.value })}
        />
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default Postit;
