import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
mutation ($title: String, $projectId: ID, $userId: ID){
    createTask(title: $title, projectId: $projectId, userId: $userId){
        title
        project{
            _id
        }
    }
}
`;

export const DELETE_TASK = gql`
mutation($id: ID!) {
  deleteTask(_id: $id) {
    _id
    title
  }
}
`;
