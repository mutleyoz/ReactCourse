import React, { useEffect, useState } from 'react';
import {loadAuthors, saveAuthor} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import AuthorForm from './AuthorForm';
import {newAuthor} from '../../../tools/mockData'
import { toast } from 'react-toastify';

export function ManageAuthorPage({authors, loadAuthors, saveAuthor, history, ...props}) {
    const [author, setAuthor] = useState({...props.author});
    const [errors, setErrors ] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if(authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Error loading authors " + error.message);
            });
        } else {
            setAuthor({...props.author});
        }
    }, [props.author])

    function isFormValid() {
        const {id, name} = author;
        const errors = {};

        if(!name) errors.name = "Author name is required"
        setErrors(errors);
        
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if(!isFormValid()) return;

        setSaving(true);
        saveAuthor(author).then(() => {
            toast.success("Author saved");
            history.push('/authors');
        }).catch(error => {
            setSaving(false);
            setErrors({ onSave: error.message });
        });
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setAuthor(prevAuthor => ({
            ...prevAuthor,
            [name]: name === "id" ? parseInt(value, 10) : value
        }));
    }

    return(
        <AuthorForm onSave={handleSave} onChange={handleChange} author={author} errors={errors} saving={saving} />
    );
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors:  PropTypes.func.isRequired,
    saveAuthor:  PropTypes.func.isRequired,
    history: PropTypes.object.isRequired    
}

function getAuthorBySlug(authors, slug) {
    return authors.find(author => author.id === slug) || null
}

function mapStateToProps(state, ownProps)  {
    const slug = ownProps.match.params.slug;
    const author = slug && state.authors.length > 0 ? getAuthorBySlug(state.authors, slug) : newAuthor;

    return({
        author: author,
        authors: state.authors
    });
}

const mapDispatchToProps = {
    loadAuthors: loadAuthors,
    saveAuthor: saveAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage)




