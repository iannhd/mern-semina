import {
    combineReducers,
    legacy_createStore as createStore,
    applyMiddleware,
    compose
} from 'redux'

import thunk from 'redux-thunk'
import authReducer from './auth/reducer'
import categoriesReducer from './categories/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer
});

const store = createStore(
    rootReducer,
    composerEnhancer(applyMiddleware(thunk))
)

export default store