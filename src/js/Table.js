import React from 'react'
import Row from './Row'
import THead from './THead';

const Table = (props) => {
    return (
        <>
            <table className={props.className}>
                <THead
                    colNames={props.colNames}
                    filter={props.filter}
                />
                <tbody>
                    {
                        props.isBig ?
                            props.base[props.currentPage].map((person, i) => {
                                return (
                                    <Row
                                        className='clickable'
                                        onClick={props.getPerson}
                                        key={i}
                                        data_id={i}
                                        id={person.id}
                                        firstName={person.firstName}
                                        lastName={person.lastName}
                                        email={person.email}
                                        phone={person.phone}
                                    />
                                )
                            })
                            :
                            props.base.map((person, i) => {
                                return (
                                    <Row
                                        className='clickable'
                                        onClick={props.getPerson}
                                        key={i}
                                        data_id={i}
                                        id={person.id}
                                        firstName={person.firstName}
                                        lastName={person.lastName}
                                        email={person.email}
                                        phone={person.phone}
                                    />
                                )
                            })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table

