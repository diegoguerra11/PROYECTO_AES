import { gql } from "@apollo/client"

export const GET_PROJECTS = gql`
query getProjects{
    projects{
        _id
        name
        description
    }
}
`;

export const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(_id: $id){
            _id
            name
            description
            createdAt
            tasks{
                _id
                title
                user {
                    name
                    lastname
                }
            }
        }
    }
    `;

export const CREATE_PROJECT = gql`
mutation($name: String, $description: String){
    createProject(name: $name, description: $description){
        _id
        name
        description
    }
}
`
   
export const CREATE_PROJECT_SUBSCRIPTION =  gql`
    subscription {
        createProject {
            _id
            name
            description
        }
    }
`
