import React from 'react'

const Row = (props) => {
    return (

        <tr 
            className={props.className}
            data_id={props.data_id}
            onClick={props.onClick}
        >
            <td>{props.id}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
        </tr>
    )
}

export default Row
