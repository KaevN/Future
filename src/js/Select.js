import React from 'react'

const Select = (props) => {
    return (
        <select
            className={props.className}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
        >
            <option value="getselect">Выберите базу</option>
            <option value="small">Малая база</option>
            <option value="big">Большая база</option>
        </select>
    )
}

export default Select
