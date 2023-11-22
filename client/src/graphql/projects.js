import {gql} from "@apollo/client";

export const GET_PROJECT = gql`
    query ($id: ID!) {
        project(_id: $id){
            _id
            name
            description
            createdAt
            tasks{
                _id
                title
            }
        }
    }
    `;