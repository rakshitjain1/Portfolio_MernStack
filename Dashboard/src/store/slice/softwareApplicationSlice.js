import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"



const softwareApplicationSlice = createSlice({
    name:"softwareApplication",
    initialState:{
        loading:false,
        softwareApplications:[],
        error:null,
        message:null,
    },
    reducers:{
        getAllsoftwareApplicationRequest(state,action){
            state.softwareApplications = [],
            state.error = null,
            state.loading =true
        },
        getAllsoftwareApplicationSuccess(state,action){
            state.softwareApplications = action.payload,
            state.error=null,
            state.loading=false;
        },
        getAllsoftwareApplicationFailed(state,action){
            state.softwareApplications = state.softwareApplications,
            state.error= action.payload,
            state.loading=false;
        },
        addNewSoftwareApplicationRequest(state,action){
            state.loading=true,
            state.error=null,
            state.message=null
        },
        addNewSoftwareApplicationSuccess(state,action){
            state.error=null,
            state.loading=false,
            state.message=action.payload
        },
        addNewSoftwareApplicationFailed(state,action){
            state.loading=false,
            state.error=action.payload,
            state.message=null
        },
        deletesoftwareApplicationsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deletesoftwareApplicationsSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
        },
        deletesoftwareApplicationsFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
        },
        resetSoftwareApplicationSlice(state, action) {
            state.error = null;
            state.softwareApplications = state.softwareApplications;
            state.message = null;
            state.loading = false;
        },
          clearAllErrors(state, action) {
            state.error = null;
            state.softwareApplications = state.softwareApplications;
        },
    },
})

export const getAllsoftwareApplications =()=> async (dispatch)=>{
    dispatch(softwareApplicationSlice.actions.getAllsoftwareApplicationRequest());
    try {
        const response = await axios.get("https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/softwareApplication/getall", { withCredentials: true })
        dispatch(softwareApplicationSlice.actions.getAllsoftwareApplicationSuccess(response.data.softwareApplications))
        dispatch(softwareApplicationSlice.actions.clearAllErrors())
        
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(error.response.data.message))
    }

}

export const addNewSoftwareApplication = (data) => async (dispatch) => {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareApplicationRequest()
    );
    try {
      const response = await axios.post(
        "https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/softwareApplication/add",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(
        softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(
          response.data.message
        )
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        softwareApplicationSlice.actions.addNewSoftwareApplicationFailed(
          error.response.data.message
        )
      );
    }
  };
  
  export const deleteSoftwareApplication = (id) => async (dispatch) => {
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
    );
    try {
      const response = await axios.delete(
        `https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/softwareApplication/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(
        softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
          response.data.message
        )
      );
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
          error.response.data.message
        )
      );
    }
  };
  
  export const clearAllSoftwareAppErrors = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  };
  
  export const resetSoftwareApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
  };


  export default softwareApplicationSlice.reducer;
