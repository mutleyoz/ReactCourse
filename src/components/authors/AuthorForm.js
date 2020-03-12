import React from 'react';

const AuthorForm = (author, onSave) => {
    return(
        <form onSubmit={onSave}>
            <h2>{author.id ? "Edit" : "Add"} Author</h2>
        </form>
    );
}

export default AuthorForm;