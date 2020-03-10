import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const AuthorList = ({authors, courses, onDeleteClick}) => {
    return(
        <table className="table">
            <thead>
                <th>Name</th>
                <th>Courses</th>
                <th/>
            </thead>
            <tbody>
                {authors.map(author => {
                    return(
                        <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>1</td>
                            <td><button className="btn btn-danger" onClick={onDeleteClick}>Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};


export default AuthorList;