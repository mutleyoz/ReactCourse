import * as actionTypes from './actionTypes'
import * as authorApi from "../../api/authorApi"
import {beginApiCall, apiCallError} from "./apiStatusActions"

function loadAuthorsSuccess(authors) {
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

function deleteAuthorOptimistic(author) {
    return {type: actionTypes.DELETE_AUTHOR_OPTIMISTIC, author};
}

function createAuthorSuccess(author) {
    return {type: actionTypes.CREATE_AUTHOR_SUCCESS, author};
}

function updateAuthorSuccess(author) {
    return {type: actionTypes.UPDATE_AUTHOR_SUCCESS, author};
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

export function saveAuthor(author) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return authorApi.saveAuthor(author)
            .then(savedAuthor => {
                savedAuthor.id 
                    ? dispatch(updateAuthorSuccess(author))
                    : dispatch(createAuthorSuccess(author))
                })
            }
}

