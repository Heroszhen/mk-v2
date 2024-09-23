import React, { useRef } from 'react';
import "./search.scss";

const Search = (props) => {
    const inputRef = useRef(null);

    const sendKeywords = (e) => {
        e.preventDefault();
        props.setKeywords(inputRef.current.value);
        props.setCurrentPage(1);
        props.searchDatas(inputRef.current.value);
    }

    return (
        <section id="search" >
            <form className="wrap" onSubmit={(e) => sendKeywords(e)}>
                <input type="text" id="input-search-bar" ref={inputRef} defaultValue={props.keywords} />
                <div 
                    className='wrap-icon' 
                    onClick={(e) => sendKeywords(e)}
                >
                    <i className="bi bi-search"></i>
                </div>
            </form>
        </section>
    )
}
export default Search;