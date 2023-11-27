import { useState } from "react"
import { useMutation } from '@apollo/client'
import { AUTENTICATION } from '../graphql/user'
import { useNavigate } from "react-router-dom";

export function Login(){

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        password: ''
    })

    const [login, {loading, error}] = useMutation(AUTENTICATION, onerror);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await login({
            variables: {
                name: user.name,
                password: user.password
            }
        })

        if(response.data.login != null) {
            const {_id, lastname, name} = response.data.login
            localStorage.setItem('id', _id);
            localStorage.setItem('user', `${lastname} ${name}`);
            navigate("/projects");
        } else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#FF0000',
                color: '#FFF',
                class: 'text-danger',
                position: 'topRight',
                message: "USUARIO NO ENCONTRADO"
            });
        }
    }

    const handleChange = ({target: {name, value}}) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    return(
        <div className="bg-zinc-900 rounded-md shadow-lg shadow-black p-8 h-3/5 w-3/5
        "
        >
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Login</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white-900">Nombre</label>
                            <div className="mt-2">
                                <input onChange={handleChange} id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white-900">Contraseña</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={handleChange} id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={!user.name || !user.password || loading}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}