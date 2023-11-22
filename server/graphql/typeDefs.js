import { gql } from 'graphql-tag'

export const typeDefs = gql` 
    type Query {
        hello: String
        projects: [Project]
        project(_id: ID!): Project 
        task(_id: ID!): Task 
        tasks: [Task]
    }

    type Mutation {
        createProject(name: String, description: String): Project
        createTask(title: String, projectId: ID): Task
        updateProject(_id: ID!, name: String!, description: String): Project
        deleteProject(_id: ID!): Project
        deleteTask(_id: ID!): Task
        updateTask(_id: ID!, title: String!, projectID: ID!): Task
    }

    type Project {
        _id: ID
        name: String
        description: String
        createdAt: String
        updatedAt: String
    }

    type Task {
        _id: ID
        title: String
        projectId: ID
        createdAt: String
        updatedAt: String
    }
`