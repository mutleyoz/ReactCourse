import React, { useEffect, useState } from 'react';
import {loadAuthors} from '../../redux/actions/authorActions';
import {connect} from 'react-redux';
import AuthorForm from './AuthorForm';

export function ManageAuthorPage({authors, loadAuthors, saveAuthor, ...props}) {
    const [author, setAuthor] = useState({...props.author});

    useEffect(() => {
        if(authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Error loading authors " + error.message );
            });
        } else {
            setAuthor(props.author);
        }
    })

    return(
        <AuthorForm author={author} />
    );
}

function mapStateToProps(state, ownProps)  {
    return({
        authors: state.authors
    })
}

const mapDispatchToProps = {
    saveAuthor: saveAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage)




