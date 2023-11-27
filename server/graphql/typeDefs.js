import { gql } from 'graphql-tag'

export const typeDefs = gql` 
    type Query {
        hello: String
        projects: [Project]
        project(_id: ID!): Project 
        task(_id: ID!): Task 
        tasks: [Task]
        users: [User]
    }

    type Mutation {
        createProject(name: String, description: String): Project
        createTask(title: String, projectId: ID, userId: ID): Task
        updateProject(_id: ID!, name: String!, description: String): Project
        deleteProject(_id: ID!): Project
        deleteTask(_id: ID!): Task
        updateTask(_id: ID!, title: String!, projectID: ID!): Task
        createUser(name: String, lastname: String, password:String): User
        login(name: String, password: String): User
    }

    type Project {
        _id: ID
        name: String
        description: String
        createdAt: String
        updatedAt: String
        tasks: [Task]
    }

    type Task {
        _id: ID
        title: String
        project: Project
        createdAt: String
        updatedAt: String
    }

    type User {
        _id: ID
        name: String
        lastname: String
        password: String
    }

    type Subscription {
        createProject: Project
        allocateTask: Task
        login: User
    }
`