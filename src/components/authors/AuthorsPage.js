import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import AuthorList from './AuthorList'

export function AuthorsPage({courses, authors, actions}) {
    useEffect(() => {
        if(authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed " + error);
            });
        }
        if(courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        }
    });

    const handleDeleteAuthor = async author => {
        alert(author.name);
    }

    return (
        <>
            <h2>Authors</h2>
            <AuthorList authors={authors} onDeleteClick={handleDeleteAuthor} />
        </>
    );
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        authors: state.courses.length === 0 
            ? [] 
            : state.authors.map( author => {
                return {...author, coursecount: state.courses.filter(course => course.authorId === author.id).length }
        }),
        courses: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses : bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors:  bindActionCreators(authorActions.loadAuthors, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage)