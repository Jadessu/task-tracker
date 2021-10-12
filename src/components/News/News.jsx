import React from "react"

function News ({title, url}){


    return (
        <div>
            <h1>This is news</h1>
            <h1>{title}</h1>
            <p>{url}</p>
        </div>

    )
}

export default News