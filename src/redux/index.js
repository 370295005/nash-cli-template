import { createStore, combineReducers } from 'redux'
import scrollReducers from './reducers/scroll'
const reducers = combineReducers({
  scrollMap: scrollReducers
})
export default createStore(reducers)
