import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
    switch(action.type){
        case actionTypes.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        case actionTypes.DELETE_AUTHOR_OPTIMISTIC:
            return state.filter(author => author.id !== action.author.id);
        default:
            return state;
    }
}