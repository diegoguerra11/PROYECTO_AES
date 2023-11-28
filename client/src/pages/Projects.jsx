import { ProjecForm } from "../components/ProjectForm";
import { ProjectList } from "../components/ProjectList";
import { useSubscription } from "@apollo/client";
import { LOGIN } from '../graphql/user';
import { ALLOCATE_TASK, FINALIZED_TASK } from '../graphql/tasks'

export function Projects(){
    
    //SE CONECTA A UNA SUBSCRIPCION CON EL NOMBRE LOGIN
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
    });

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

    return(
        <div className="bg-zinc-900 rounded-md shadow-lg shadow-black p-8 h-3/5 w-3/5
        "
        >
            <h1 className="text-2xl font-bold py-2 mb-4">Project Manager</h1>
            <div className="flex justify-between gap-x-1">
                <ProjecForm/>
                <ProjectList/>
            </div>
        </div>
    )
}