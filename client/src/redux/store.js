import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const rootReducer=combineReducers({user:userReducer})

const persistConfig={
    key:'root',//setting key vale for my persist reducer which i can see in localstorage
    storage,//specifies that localstorage will be used as storage system
    verson:1
}
//here i convert my normal reducer into persist reducer to ensure that the data in reducer stored in localstorage
const persisReducer=persistReducer(persistConfig,rootReducer)//here i creting a persists reducer which use localstorage to store redux store data or states


export const store = configureStore({
    reducer:persisReducer,
    //this default middleware is needed to set false to serializable check to allow non serializable data (function,class type,class instance) to store in redux store management
    middleware: (defaultMiddleware) => defaultMiddleware({
        serializableCheck: false
    })
})
//here i pass a store object with persisStore function,so i get an object in persistor variable
export const persistor=persistStore(store)//here i give ability of persistore to my normal redux store
//this persistore manage if any state is changed in redux store it monitore and update the updated value in localstorage
//aslo this is important to fecth data from local storage