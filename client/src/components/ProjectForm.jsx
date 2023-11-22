import { useState } from "react"
import { useMutation } from "@apollo/client"
import {  CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjecForm(){
    
    const [project,setProject] = useState({
        title:"",
        description:"",
    });
    
    const [createProject, {loading, error}] = useMutation(CREATE_PROJECT,{
        refetchQueries: [
            {
                query: GET_PROJECTS,
            },
            "GetProjects",
        ],
    })
        

   

    const handleChange = e =>{
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.name, e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        createProject({
            variables: {
                name: project.name,
                description: project.description
            }
        })
        console.log(project);
    }

    return(
        <form onSubmit={handleSubmit}>

            {error && <p>{error.message}</p>}

            <input
                type="text"
                 name="name"
                placeholder="Escribe el título"
                onChange={handleChange} 
      />
      <textarea
                name="description"
                rows="3"
                placeholder="Escribe la descripción"
                onChange={handleChange} 
      ></textarea>
            <button
                disabled={!project.name || !project.description || loading}
            >save</button>
        </form>
    )
}