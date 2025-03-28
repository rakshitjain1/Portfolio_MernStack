import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimeLineRequest(state, action) {
      state.timeline = [], 
      state.error = null, 
      state.loading = true;
    },
    getAllTimeLineSuccess(state, action) {
      state.timeline = action.payload
        state.error = null,
        state.loading = false;
    },
    getAllTimeLineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimeLineRequest(state, action) {
      state.message = null, 
      state.error = null,
        state.loading = true;
    },
    deleteTimeLineSuccess(state, action) {
      state.message = action.payload,
        state.error = null,
        state.loading = false;
    },
    deleteTimeLineFailed(state, action) {
        state.message = null;
        state.error = action.payload;
        state.loading = false;
      },
      addTimeLineRequest(state, action) {
        state.message = null, 
        state.error = null,
          state.loading = true;
      },
    addTimeLineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    addTimeLineSuccess(state, action) {
      state.message = action.payload,
        state.error = null,
        state.loading = false;
    },
  
    resetTimeLinesSlice(state, action) {
      state.error = null,
        state.timeline = state.timeline,
        state.message = null,
        state.loading = false;
    },

    clearAllErrors(state, action) {
      state.error = null,
       state.timeline = state.timeline;
    },
  },
});

export const getAllTimeLine  = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimeLineRequest());
  try {
    const { data } = await axios.get(
      "https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/timeline/getall",
      { withCredentials: true }
    );
    // console.log(data);

    dispatch(timelineSlice.actions.getAllTimeLineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimeLineFailed(error.response.data.message)
    );
  }
};


export const addNewtimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimeLineRequest());
  try {
    const {data}= await axios.post(
      `https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/timeline/add`,timelineData,
      {
        withCredentials: true,
        headers:{"Content-Type":"application/json"}
      }        
      
    );
    console.log(data);
    dispatch(timelineSlice.actions.addTimeLineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimeLineFailed(error.response.data.message)
    );
  }
};
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimeLineRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }                    
    );
    dispatch(timelineSlice.actions.deleteTimeLineSuccess(response.data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimeLineFailed(error.response.data.message)
    );
  }
};

export const clearAllTimeLineErrors = () =>(dispatch) =>{
  dispatch(timelineSlice.actions.clearAllErrors())
}

export const resetTimeLinesSlice = ()=>(dispatch) =>{
  dispatch(timelineSlice.actions.resetTimeLinesSlice())
}

export default timelineSlice.reducer;
