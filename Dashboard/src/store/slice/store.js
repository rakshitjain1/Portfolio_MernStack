import {configureStore} from "@reduxjs/toolkit"
import  userReducer  from "./userSlice"
import forgotResetPassReducer from "./forgotResetPasswordSlice.js"
import messagesReducer from "./messagesSlice.js"
import timelineReducer from "./timelineSlice.js"
import skillReducer from "./skillSlice.js"
import softwareApplicationreducer from "./softwareApplicationSlice.js"
import projectreducer from "./projectSlice.js"

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