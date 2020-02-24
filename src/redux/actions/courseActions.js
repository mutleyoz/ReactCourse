import * as actionTypes from './actionTypes'
import * as courseApi from "../../api/courseApi"

function loadCoursesSuccess(courses) {
    return {type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return {type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return {type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch( error => {
            throw error;
        })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        return courseApi
            .saveCourse(course)
            .then(savedCourse => {
                course.id
                    ? dispatch(updateCourseSuccess(savedCourse))
                    : dispatch(createCourseSuccess(savedCourse));
            })
            .catch(error => {
                throw error;
            });
    }
}