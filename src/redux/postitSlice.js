import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const postPostit = createAsyncThunk('postit/postPostit', async (params) => {
  const response = await axios.post(`${REACT_APP_API_URL}/api/v1/postit`, {
    ...params.currentPostit,
    workspace_id: params.workspaceId
  })
  return { data: response.data, status: response.status }
})

export const patchPostit = createAsyncThunk('postit/patchPostit', async (params) => {
  const response = await axios.patch(`${REACT_APP_API_URL}/api/v1/postit/${params.postit.id}`, {
    ...params.currentPostit,
    workspace_id: params.workspaceId
  })
  return { data: response.data, status: response.status }
})

export const deletePostit = createAsyncThunk('postit/deletePostit', async (params) => {
  const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/postit/${params.postit.id}`)
  return { data: response.data, status: response.status }
})

export const postitSlice = createSlice({
  name: 'postit',
  initialState: {
    data:  {
      title: '',
      description: '',
      done: false
    },
    loading: false,
    error: null,
    status: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // post
    builder.addCase(postPostit.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    })
    builder.addCase(postPostit.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.data = action.payload.data
        state.loading = false
        state.status = action.payload.status
      }
    })
    builder.addCase(postPostit.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.error = 'Error occured'
      }
    })
    // patch
    builder.addCase(patchPostit.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    })
    builder.addCase(patchPostit.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.data = action.payload.data
        state.loading = false
        state.status = action.payload.status
      }
    })
    builder.addCase(patchPostit.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.error = 'Error occured'
      }
    })
    // delete
    builder.addCase(deletePostit.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    })
    builder.addCase(deletePostit.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.data = action.payload.data
        state.loading = false
        state.status = action.payload.status
      }
    })
    builder.addCase(deletePostit.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.error = 'Error occured'
      }
    })
  }
})

export default postitSlice.reducer
