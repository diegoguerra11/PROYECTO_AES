import {useNavigate} from "react-router-dom";


export function ProjectCard({project }){
    return (
        <div onClick={() => navigate('/projects/${project._id}')}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    )
}