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
export const FINISH_TASK = gql`
mutation($id: ID!) {
  finishTask(_id: $id) {
    _id
    title
    project {
      _id
      name
      description
    }
    user {
      name
      lastname
    }
  }
}
`;

export const FINALIZED_TASK = gql`
  subscription FinalizedTask {
    finalizedTask {
      _id
      createdAt
      title
      finalized
      project {
        name
      }
    }
  }
`;

export const ALLOCATE_TASK = gql`
subscription AllocateTask {
  allocateTask {
    _id
    title
    project {
      _id
      name
      description
    }
    user {
      _id
      name
      lastname
    }
    finalized
  }
}
`;
