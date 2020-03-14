import React, { useEffect, useState } from 'react'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {loadCourses} from '../../redux/actions/courseActions'
import {loadAuthors, deleteAuthor} from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import AuthorList from './AuthorList'
import { toast } from 'react-toastify'

export function AuthorsPage({courses, authors, loadAuthors, loadCourses, deleteAuthor}) {

    const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
    useEffect(() => {
        if(authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed " + error);
            });
        }
        if(courses.length === 0) {
            loadCourses().catch(error => {
                alert("Loading courses failed " + error);
            });
        }
    }, []);

    const handleDeleteAuthor = async author => {
        toast.success("Author deleted");
        try {
            await deleteAuthor(author);
        } catch(error) {
            toast.error("Delete failed. " + error.message, {autoClose: false})
        }
    }

    return (
        <>
            {redirectToAddAuthorPage && <Redirect to="/author" />}
            <h2>Authors</h2>
            <button style={{marginBottom: 20}} className="btn btn-primary add-author" onClick={() => setRedirectToAddAuthorPage(true)}>Add Author</button>
            <AuthorList authors={authors} onDeleteClick={handleDeleteAuthor} />
        </>
    );
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired
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

const mapDispatchToProps = {
    loadCourses : loadCourses,
    loadAuthors: loadAuthors,
    deleteAuthor : deleteAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage)