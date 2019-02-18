import React, { useState } from 'react';

const Write = ({ onPost = () => Promise.resolve() }) => {

    const [contents, setContents] = useState('')

    function handlePost() {
        console.log(contents)
        onPost(contents).then(() => setContents(''))
    }

    return (
        <div className="container write">
            <div className="card">
                <div className="card-content">
                    <textarea
                        className="materialize-textarea"
                        placeholder="Write down your memo"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}></textarea>
                </div>
                <div className="card-action">
                    <a onClick={handlePost}>POST</a>
                </div>
            </div>
        </div>
    )
}

export default Write