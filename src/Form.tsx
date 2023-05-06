// import React, { FormEvent, useRef, useState } from 'react'
import React from 'react'

import {useForm, FieldValues} from "react-hook-form"

interface Building {
    id: number;
    name: string;
    lat: number;
    long: number;
    code: string;
    decription: string;
}

function Form() {
    const { register, handleSubmit, formState: {errors} } = useForm<Building>();

    // const onSubmit =(data: FieldValues) => {
    //     fetch('/buildings', {
    //         method: 'Post',
    //         data: JSON.stringify(data),
    //     });
    // }

    const onSubmit = async (data: FieldValues) => {
        console.log(data)
        console.log(JSON.stringify(data))
        try {
            fetch("http://localhost:3000/buildings", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="container" style={{padding:20}}>
            <form onSubmit= {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="id" className="form-label">Building ID</label>
                    <input 
                    type="number" 
                    {...register('id', { required: true, minLength: 1})}
                    id="id" className="form-control" name="id" />
                    {errors.id?.type === 'required' && <p>ID is required.</p>}
                    {errors.id?.type === 'minLength' && <p>ID must be at least 1 character.</p>}
                </div>
                <div>
                    <label htmlFor="name" className="form-label">Building Name</label>
                    <input type="text" 
                    {...register('name', { required: true, minLength: 1})}
                    id="name" 
                    className="form-control" 
                    name="name" />
                    {errors.name?.type === 'required' && <p>Name is required.</p>}
                    {errors.name?.type === 'minLength' && <p>Name must be at least 1 character.</p>}
                </div>
                <div>
                    <label htmlFor="lat" className="form-label">Latitude</label>
                    <input type="number" 
                    {...register('lat', { required: true, minLength: 1})}
                    id="lat" 
                    className="form-control" 
                    name="lat" />
                    {errors.lat?.type === 'required' && <p>Latitude is required.</p>}
                    {errors.lat?.type === 'minLength' && <p>Latitude must be at least 1 character.</p>}
                </div>
                <div>
                    <label htmlFor="long" className="form-label">Longitude</label>
                    <input type="number" 
                    {...register('long', { required: true, minLength: 1})}
                    id="long" 
                    className="form-control" 
                    name="long" />
                    {errors.long?.type === 'required' && <p>Longitude is required.</p>}
                    {errors.long?.type === 'minLength' && <p>Longitude must be at least 1 character.</p>}
                </div>
                <div>
                    <label htmlFor="code" className="form-label">Code</label>
                    <input type="text" 
                    {...register('code', { required: true, minLength: 1})}
                    id="code" 
                    className="form-control" 
                    name="code" />
                    {errors.code?.type === 'required' && <p>Code is required.</p>}
                    {errors.code?.type === 'minLength' && <p>Code must be at least 1 character.</p>}
                </div>
                <div>
                    <label htmlFor="decription" className="form-label">Description</label>
                    <input type="text" 
                    {...register('decription', { required: true, minLength: 1})}
                    id="decription" 
                    className="form-control" 
                    name="decription" />
                    {errors.decription?.type === 'required' && <p>Description is required.</p>}
                    {errors.decription?.type === 'minLength' && <p>Description must be at least 1 character.</p>}
                </div>

                <div style={{paddingTop:20}}>
                    <button className= "btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;