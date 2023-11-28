import { useMutation } from '@apollo/client'
import { DELETE_TASK, FINISH_TASK } from '../../graphql/tasks';
import { FaCalendarCheck } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai'

export function TaskCard({ task }){

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: ['getProject'],
    });

    const [finalizedTask] = useMutation(FINISH_TASK);

    return (
        <div className='bg-zinc-900 px-5 py-3 mb-2 flex justify-between'>
            <h1 className='text-sm'>{task.title} - {task.user.lastname} {task.user.name}</h1>

            <button
                onClick={() =>{
                    finalizedTask({
                        variables: {
                            id:task._id,
                        },
                    });
                }}
            >
              <FaCalendarCheck />
            </button>

            <button
                onClick={() =>{
                    deleteTask({
                        variables: {
                            id:task._id,
                        },
                    });
                }}
            >
                <AiOutlineDelete/>
            </button>
        </div>
    );
}
