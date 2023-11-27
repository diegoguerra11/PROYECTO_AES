import { useQuery, useSubscription } from '@apollo/client';
import { GET_PROJECTS, CREATE_PROJECT_SUBSCRIPTION } from '../graphql/projects';
import { ProjectCard} from "./ProjectCard";

export function ProjectList(){

    useSubscription(CREATE_PROJECT_SUBSCRIPTION, {
        onSubscriptionData: ({ subscriptionData }) => {
            const {name} = subscriptionData.data.createProject
            
            iziToast.show({
                title: 'INFO',
                titleColor: '#32AAEA',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: `Se creó un nuevo proyecto: ${name}`
            });

            refetch();
        }        
    })  

    const {loading, error, data, refetch} = useQuery(GET_PROJECTS)

    if(loading) return <p>Loading</p>
    if(error) return <p>Error</p>

    return(
        <div className='overflow-y-auto h-72 w-full px-5'>
            {
                data.projects.map(project=>(
                    <ProjectCard key={project._id} project={project}/>
                ))    
            }
        </div>
    );
    
}