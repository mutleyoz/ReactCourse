import React from 'react'
import PropTypes from 'prop-types'

const AuthorList = ({authors, onDeleteClick}) => {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Courses</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {authors.map(author => {
                    return(
                        <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>{author.coursecount}</td>
                            <td><button className="btn btn-outline-danger" disabled={author.coursecount > 0} onClick={ () => onDeleteClick(author)}>Delete</button></td>
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