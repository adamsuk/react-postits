import React, { useEffect } from 'react';
import withRouter from '../hooks/withRouter';
import { useDispatch, useSelector } from 'react-redux'
import { postWorkspace } from '../redux/workspaceSlice'

import './Homepage.css'

const Homepage = ({ router: { navigate }}) => {
  const dispatch = useDispatch()
  const { id: workspaceId, status } = useSelector((state) => state.workspace)

  const initPostit = {
    title: 'Welcome to Simple Post-its',
    description: 'Just Click Me to Start a Workspace!'
  }

  useEffect(() => {
    if (status === 200 && workspaceId) {
      navigate(`/${workspaceId}`)
    }
  }, [status, workspaceId])

  const createWorkspace = () => {
    dispatch(postWorkspace())
  }

  return (
    <div className='homepage__container'>
      <div className='homepage__postit' onClick={createWorkspace}>
        <p className="homepage__postit-title">
          {initPostit.title}
        </p>
        <hr></hr>
        <p className="homepage__postit-description">
          {initPostit.description}
        </p>
      </div>
    </div>
  )
}

export default withRouter(Homepage);
