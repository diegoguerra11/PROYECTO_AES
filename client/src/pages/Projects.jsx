import { ProjecForm } from "../components/ProjectForm";
import { ProjectList } from "../components/ProjectList";
import { useSubscription } from "@apollo/client";
import { LOGIN } from '../graphql/user';

export function Projects(){
    
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