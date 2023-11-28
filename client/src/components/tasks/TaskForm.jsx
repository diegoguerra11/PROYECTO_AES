import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TASK } from '../../graphql/tasks'
import { GET_USERS } from '../../graphql/user'
import { useParams } from "react-router-dom";

export function TaskForm(){

    const [createTask] = useMutation(CREATE_TASK, {
        refetchQueries: ['getProject']
    });

    const {loading, error, data} = useQuery(GET_USERS);

    const params = useParams();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await createTask({
            variables:{
                title :e.target.title.value,
                projectId: params.id,
                userId: e.target.user.value,
            },
        });
        e.target.reset();
        e.target.title.focus();
    };

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" 
                className='bg-zinc-900 text-white w-full p-2 rounded-lg mb-2'
                placeholder="Añadir una tarea"
            />

            <select
                name='user' 
                className='bg-zinc-900 text-white w-full p-2 rounded-lg mb-2'
                placeholder="Delegar Tarea"
            >
                <option value=''>-- Seleccionar Usuario --</option>
                {
                    data.users.map(item => (
                        <option key={item._id} value={item._id}>{item.lastname} {item.name}</option>
                    ))  
                }  
      
            </select>
            
            <button className='bg-sky-900 text-white w-full p-2 rounded-lg'>
                Add
            </button>
        </form>
    );
}