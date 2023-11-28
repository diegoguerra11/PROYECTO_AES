import { gql } from "@apollo/client"

//MUTATION QUE PERMITE AUTENTICAR A UN USUARIO
export const AUTENTICATION = gql`
mutation($name: String, $password: String) {
    login(name: $name, password: $password) {
        _id
        name
        lastname
    }
}
`

// CONSULTA DE USUARIOS
export const GET_USERS = gql`
    query Users {
        users {
            _id
            name
            lastname
        }
    }
`

//SUBSCRIPCION QUE EMITE UN MENSAJE CUANDO SE REALIZA LA MUTATION LOGIN
export const LOGIN = gql`
    subscription {
        login {
            _id
            name
            lastname
        }
    }
`
   
