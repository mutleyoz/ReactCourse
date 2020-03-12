import * as actionTypes from './actionTypes'
import * as authorApi from "../../api/authorApi"
import {beginApiCall, apiCallError} from "./apiStatusActions"

function loadAuthorsSuccess(authors) {
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

function deleteAuthorOptimistic(author) {
    return {type: actionTypes.DELETE_AUTHOR_OPTIMISTIC, author}
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginApiCall())
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch( error => {
            dispatch(apiCallError(error));
            throw error;
        })
    }
}

export function deleteAuthor(author) {
    return function(dispatch) {
        dispatch(deleteAuthorOptimistic(author.id));
        authorApi.deleteAuthor(author.id);
    }
}

