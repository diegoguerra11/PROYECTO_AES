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
        <form onSubmit={handleSubmit} className="w-2/5 ">

            {error && <p>{error.message}</p>}

            <input
                type="text"
                name="name"
                placeholder="Escribe el título"
                onChange={handleChange} 
                className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
            />
            <textarea
                    name="description"
                    rows="3"
                    placeholder="Escribe la descripción"
                    onChange={handleChange} 
                    className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
            ></textarea>
            <button
                disabled={!project.name || !project.description || loading}
                className="bg-blue-500 px-4 py-3 text-lg mb-3 rounded-md disabled:bg-zinc-400"
            >save</button>
        </form>
    )
}