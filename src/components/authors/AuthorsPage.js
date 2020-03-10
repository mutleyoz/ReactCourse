import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import AuthorList from './AuthorList'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'

const AuthorsPage = () => {
    const {courses, authors, actions } = this.props;
    useEffect(() => {
        if(authors.length==0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed " + error);
            })
        }
    });

    const onDeleteClick = (event) => {
        alert(event);
    }

    return(
        <>
        <h2>Authors</h2>
        <AuthorList authors={authors} courses={courses} onDeleteClick={onDeleteClick} />
        </>
    );
}

AuthorsPage.prototype = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        authors: state.authors,
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