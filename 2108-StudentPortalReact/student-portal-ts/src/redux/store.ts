import { applyMiddleware, createStore, combineReducers, AnyAction } from 'redux'
import { authReducer } from './reducers'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// All reducers combined into a root reducer to apply middleware, If you make a new reducer put it here
const rootReducer = combineReducers({
  auth: authReducer
})

// Store creation this currently has dev tools on top of it to see store in the browser
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware<DispatchFunctionType, StateType>(thunkMiddleware))
)

type StateType = ReturnType<typeof rootReducer>
type DispatchFunctionType = ThunkDispatch<StateType, undefined, AnyAction>

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, AnyAction>
