import { useParams, Link } from 'react-router-dom'
import { useQuery, useSubscription } from '@apollo/client'
import { GET_PROJECT } from '../graphql/projects'
import { ALLOCATE_TASK, FINALIZED_TASK } from '../graphql/tasks'
import { TasksList } from '../components/tasks/TasksList'
import { TaskForm } from '../components/tasks/TaskForm'
import { LOGIN } from '../graphql/user';

export function ProjectDetails(){

    useSubscription(LOGIN, {
        onSubscriptionData: ({ subscriptionData }) => {
            const {name, lastname} = subscriptionData.data.login
            
            iziToast.show({
                title: 'INFO',
                titleColor: '#32AAEA',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: `Se conectó ${lastname} ${name}`
            });
        }
    })  

    useSubscription(ALLOCATE_TASK, {
        onSubscriptionData: ({ subscriptionData }) => {
            const {title} = subscriptionData.data.allocateTask
            const {_id, name} = subscriptionData.data.allocateTask.project
            const {_id:doc} = subscriptionData.data.allocateTask.user
            
            if(doc ==localStorage.getItem('id')) {
                iziToast.show({
                    title: 'INFO',
                    titleColor: '#32AAEA',
                    color: '#FFF',
                    class: 'text-danger',
                    position: 'topRight',
                    message: `Se te asignó la tarea ${title} del proyecto ${name}`
                });
            }
        }
    });

    useSubscription(FINALIZED_TASK, {
        onSubscriptionData: ({ subscriptionData }) => {
            const {title} = subscriptionData.data.finalizedTask
            const {name} = subscriptionData.data.finalizedTask.project

            iziToast.show({
                title: 'INFO',
                titleColor: '#32AAEA',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: `Se finalizó la tarea: ${title} del proyecto: ${name}`
            });
        }        
    });

    const params = useParams()

    const {data,loading, error} = useQuery(GET_PROJECT,{
        variables: {
            id: params.id,
        },
    });

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