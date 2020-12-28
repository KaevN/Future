import React from 'react'

function Card(props) {
    return (
        <>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    Выбран Пользователь:
                    <h5 className="card-title">{props.person.firstName + ' ' + props.person.lastName}</h5>
                    Описание:
                    <p className="card-text">{props.person.description != '' ? props.person.description : ''}</p>
                {props.person.address ?
                    <>
                        Адрес проживания:
                        <p className="card-text">{props.person.address.streetAddress}</p>
                        Город:
                        <p className="card-text">{props.person.address.city}</p>
                        Провинция/штат:
                        <p className="card-text">{props.person.address.state}</p>
                        Индекс:
                        <p className="card-text">{props.person.address.zip}</p>
                    </>
                :
                    <>
                        Адрес проживания:
                        <p className="card-text"></p>
                        Город:
                        <p className="card-text"></p>
                        Провинция/штат:
                        <p className="card-text"></p>
                        Индекс:
                        <p className="card-text"></p>
                    </>
                }
                </div>
            </div>
        </>
    )
}

export default Card
