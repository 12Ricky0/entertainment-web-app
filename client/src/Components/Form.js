import React from "react";

export const Form = ({ onInput }) => {
    return (
        <form>
            <div className="search-container">
                <input className="search" type="text" placeholder="Search for Movies or TV series" onInput={onInput} />
                <div className="search-icon" />
            </div>
        </form>
    )
}