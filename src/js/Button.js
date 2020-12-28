import React from 'react'

const Button = (props) => {
    return (
        <button
            id={props.id}
            className={props.className}
            value={props.value}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default Button
