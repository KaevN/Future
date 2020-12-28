import React from 'react'
import Button from './Button'

const Form = (props) => {
    return (
        <>
            <form
                id={props.id}
                className={props.className}
                onSubmit={props.submitHandle}
                onChange={props.checkInputs}
            >
                {props.form.map((input, i) => {
                    return (
                        <label
                            key={i}
                        >
                            <input
                                className='form-control'
                                type={input.type}
                                name={input.name}
                                placeholder={input.name}
                                pattern={input.pattern}
                            />
                        </label>
                    )
                })}
                <div className="col-auto">
                    {props.disabled ?
                        <Button
                        className='btn btn-primary'
                        value='submit'
                        text='Добавить'
                        disabled
                        />
                        :
                        <Button
                        className='btn btn-primary'
                        value='submit'
                        text='Добавить'
                        />
                    }
                </div>
            </form>
        </>
    )
}

export default Form
