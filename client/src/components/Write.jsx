import React, { useState } from 'react';


const Write = ({ onPost = () => Promise.resolve(), error }) => {

    const [contents, setContents] = useState('')

    function handlePost() {
        onPost(contents).then(() => {
            // console.log('handle post')
            setContents('')
        })
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
                    {error && <span class="helper-text" data-error="wrong" data-success="right">메모 저장 실패</span>}

                </div>
                <div className="card-action">
                    <span onClick={handlePost}>POST</span>
                </div>
            </div>
        </div>
    )
}

export default Write