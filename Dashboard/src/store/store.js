import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./slice/userSlice"
import forgotResetPassReducer from "./slice/forgotResetPasswordSlice.js"
import messagesReducer from "./slice/messagesSlice.js"
import timelineReducer from "./slice/timelineSlice.js"
import skillReducer from "./slice/skillSlice.js"
import softwareApplicationreducer from "./slice/softwareApplicationSlice.js"
import projectreducer from "./slice/projectSlice.js"

export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:forgotResetPassReducer,
        messages:messagesReducer ,
        timeline:timelineReducer,
        skill:skillReducer,
        softwareApplications :softwareApplicationreducer,
        project:projectreducer


    }
})