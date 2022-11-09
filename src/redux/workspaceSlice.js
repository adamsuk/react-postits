import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const { v4: uuidv4 } = require('uuid');

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getWorkspace = createAsyncThunk('workspace/getWorkspace', async (params) => {
  const response = await axios.get(`${REACT_APP_API_URL}/api/v1/workspace/${params.workspaceId}`)
  return { data: response.data, status: response.status }
})

export const postWorkspace = createAsyncThunk('workspace/postWorkspace', async () => {
  const response = await axios.post(`${REACT_APP_API_URL}/api/v1/workspace`)
  return { data: response.data, status: response.status }
})

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    data: [],
    loading: false,
    error: null,
    status: null,
    id: null
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param;
      state.data = [...state.data, {...payload, id: uuidv4()}];
    },
    update: (state, params) => {
      const { payload } = params;
      const i = state.data.findIndex((el) => el.id === payload.id)
      if (i !== -1) {
        state.data[i] = payload
      }
    },
    remove: (state, params) => {
      const { payload } = params;
      const i = state.data.findIndex((el) => el.id === payload.id)
      if (i !== -1) {
        state.data.splice(i, 1)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkspace.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    })
    builder.addCase(getWorkspace.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.data = action.payload.data
        state.loading = false
        state.status = action.payload.status
      }
    })
    builder.addCase(getWorkspace.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.error = 'Error occured'
      }
    })
    builder.addCase(postWorkspace.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    })
    builder.addCase(postWorkspace.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.id = action.payload.data?.id
        state.status = action.payload.status
      }
    })
    builder.addCase(postWorkspace.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false
        state.error = 'Error occured'
      }
    })
  }
})

const { actions, reducer } = workspaceSlice
export const { save, update, remove } = actions;
export default reducer
