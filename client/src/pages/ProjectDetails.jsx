import {useParams, Link} from 'react-router-dom'
import {useQuery, useSubscription} from '@apollo/client'
import {GET_PROJECT, EVENT_SEARCH} from '../graphql/projects'
import {TasksList} from '../components/tasks/TasksList'
import {TaskForm} from '../components/tasks/TaskForm'



export function ProjectDetails(){



    const params = useParams()
    const {data,loading, error} = useQuery(GET_PROJECT,{
        variables: {
            id: params.id,
        },
    });

    useSubscription(EVENT_SEARCH, ({subscriptionData}) => {
        console.log({subscriptionData})
    })

    console.log(data);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>

    return (
        <div>
            <Link to="/projects">
            <button className='bg-sky-900 text-white px-3 py-2'>Regresar</button>
            </Link>
            <div className='bg-zinc-900 mb-2 p-10 flex justify-between '>
            <div>
            <h1 className='text-2xl'>{data.project.name}</h1>
            <p>{data.project.description}</p>
            </div>
            </div>
            <button
            className='bg-red-500 px-3 py-2'>
                Delete</button>
            <TaskForm />
            <TasksList tasks={data.project.tasks} />    
        </div>
    );
}