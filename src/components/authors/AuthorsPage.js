import React from 'react'
import {connect} from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import AuthorList from './AuthorList'

class AuthorsPage extends React.Component {
    
    componentDidMount() {
        const {courses, authors, actions } = this.props;

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
    }

    handleDeleteAuthor = async author => {
        debugger;
        alert(author.name);
    }

    render() {
        return (
        <>
            <h2>Authors</h2>
            <AuthorList authors={this.props.authors} courses={this.props.courses} onDeleteClick={this.handleDeleteAuthor} />
        </>
        );
    }
}

AuthorsPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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