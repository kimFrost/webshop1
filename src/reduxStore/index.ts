
import { ReactNode } from "react";
import { createStore, combineReducers, compose } from 'redux';
import { reducer } from './reducer';


const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

export const store = createStore(
    combineReducers({
        state: reducer
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    //composeEnhancers(applyMiddleware(thunkMiddleware))
)

type Props = {
    children: ReactNode;
};
