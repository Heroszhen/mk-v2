import React, { useRef } from 'react';
import "./search.scss";

const Search = (props) => {
    const inputRef = useRef(null);

    const sendKeywords = (e) => {
        if(e.keyCode === 13) {
            props.setKeywords(inputRef.current.value);
            props.setCurrentPage(1);
            props.searchDatas(inputRef.current.value);
        }
    }

    return (
        <section id="search" >
            <div className="wrap">
                <input ref={inputRef} defaultValue={props.keywords} onKeyUp={sendKeywords} />
                <div 
                    className='wrap-icon' 
                    onClick={()=>{
                        props.setKeywords(inputRef.current.value);
                        props.setCurrentPage(1);
                        props.searchDatas(inputRef.current.value);
                    }}
                >
                        <i className="bi bi-search"></i>
                </div>
            </div>
        </section>
    )
}
export default Search;