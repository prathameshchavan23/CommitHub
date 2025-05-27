import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionSlice from "./connectionSlice"
import requestReducer from "./requestSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionSlice,
        requests: requestReducer
    }
})

export default appStore;