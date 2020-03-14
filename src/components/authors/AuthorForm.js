import React from 'react';
import TextInput from "../common/TextInput";
import PropTypes from 'prop-types';

const AuthorForm = ({author, onSave, onChange, errors, saving}) => {
    return(
        <form onSubmit={onSave}>
            <h2>{author.id ? "Edit" : "Add"} Author</h2>
            <TextInput
                name="name"
                label="Name"
                value={author.name}
                onChange={onChange}
                error={errors.name}
            />
            <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
            </button>
        </form>
    );
}

AuthorForm.propTypes = {
    author: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
}

export default AuthorForm;