import { applyMiddleware, createStore, combineReducers, AnyAction } from 'redux'
import { authReducer } from './reducers'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// All reducers combined into a root reducer to apply middleware, If you make a new reducer put it here
const rootReducer = combineReducers({
  auth: authReducer
})

// Store creation this currently has dev tools on top of it to see store in the browser
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType> = ThunkAction< ReturnType, RootState, unknown, AnyAction>
