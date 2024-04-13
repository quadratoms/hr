import { configureStore } from '@reduxjs/toolkit'
import formTypereducer from '../redux/reducers/formTypeSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

// ...

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, formTypereducer)


export const store = configureStore({
  reducer: {
//     posts: postsreducer,
//     comments: commentsreducer,
//     users: usersreducer
formType:persistedReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferblue type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
