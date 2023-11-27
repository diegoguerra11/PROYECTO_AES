import { gql } from "@apollo/client"

export const AUTENTICATION = gql`
mutation($name: String, $password: String) {
    login(name: $name, password: $password) {
        _id
        name
        lastname
    }
}
`

export const LOGIN = gql`
    subscription {
        login {
            _id
            name
            lastname
        }
    }
`
   
