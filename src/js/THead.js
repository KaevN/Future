import React, { useState } from 'react'



function THead(props) {
    const [click, setClick] = useState(true);
    const handleClick = () => setClick(!click);

    return (
        <thead>
            <tr onClick={handleClick}>
                {props.colNames.map((colName, i) => {
                    return (
                        <th
                            key={i}
                            scope='col'
                            data_sort={click ? 'asc' : 'desc'}
                            onClick={props.filter}
                        >
                            {colName}
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}

export default THead
