import React from 'react'

const Pagination = (props) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {props.pages.map((page, i) => {
                    return (
                        <li
                            key={i}
                            className="page-item"
                            onClick={props.clickHandler}
                        >
                            <span className="page-link">{page + 1}</span>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination
