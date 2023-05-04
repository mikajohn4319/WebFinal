// import React, { FormEvent, useRef, useState } from 'react'
import React from 'react'

import {useForm, FieldValues} from "react-hook-form"

interface Building {
    name:string;
    id: number;
}

function Form() {
    const { register, handleSubmit, formState: {errors, isValid} } = useForm<Building>();
    // console.log(dirtyFields);

    const onSubmit =(data: FieldValues) => {
        console.log(data)
    }

    return (
        <div className="container">
            <form onSubmit= {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name" className="form-label">Building Name</label>
                    <input type="text" 
                    {...register('name', { required: true, minLength: 3})}
                    id="name" 
                    className="form-control" 
                    name="name" />
                    {errors.name?.type === 'required' && <p>Name is required.</p>}
                    {errors.name?.type === 'minLength' && <p>Name must be at least 3 characters.</p>}
                </div>
                <div>
                    <label htmlFor="id" className="form-label">ID</label>
                    <input 
                    type="number" 
                    {...register('id', { required: true, minLength: 4})}
                    id="id" className="form-control" name="id" />
                    {errors.id?.type === 'required' && <p>ID is required.</p>}
                    {errors.id?.type === 'minLength' && <p>ID must be at least 4 characters.</p>}
                </div>
                <div>
                    <button disabled={!isValid} className= "btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;