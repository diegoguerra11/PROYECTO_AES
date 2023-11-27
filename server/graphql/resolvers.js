import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';
import { PubSub } from 'graphql-subscriptions';
import pkg from 'bcryptjs'

const {hash, compare} = pkg

const pubSub = new PubSub()

const events = {
    LOGIN: "LOGIN",
    CREATE_PROJECT: "CREATE_PROJECT",
    ALLOCATE_TASK: "ALLOCATE_TASK",
    FINALIZED_TASK: "FINALIZED_TASK",
}

export const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        projects: async () =>  await Project.find(),
        project: async (_, { _id}) => {

            const project = await Project.findById(_id);

            return project
        },
        task: async (_, { _id}) => await Task.findById(_id),
        tasks: async () => await Task.find(),
        users: async () => await User.find(),
    },
    Mutation: {
        createProject: async (_, {name, description}) => {
            const project = new Project({
                name,
                description,
            });
            const savedProject = await project.save();

            pubSub.publish(events.CREATE_PROJECT, { createProject: savedProject });

            return savedProject;
        },
        createUser: async (_, {name, lastname, password}) => {
            const crypt = await hash(password, 2);

            const user = new User({
                name,
                lastname,
                password:crypt
            });
            
            const savedUser = await user.save();

            return savedUser;
        },
        createTask: async (_, {title, projectId, userId}) => {

            const projectFound = await Project.findById(projectId);

            if(!projectFound) throw new Error ('Project not found');
            
            const task = new Task({
                title,
                projectId,
                userId,
            });
            
            const taskSaved = await task.save();
            
            pubSub.publish(events.ALLOCATE_TASK, { allocateTask: taskSaved });

            return taskSaved;
        },
        deleteProject: async (_, { _id}) => {
            const deletedProject = await Project.findByIdAndDelete(_id);
            if (!deletedProject) throw new Error("Project not found");

            await Task.deleteMany({ projectId: deletedProject._id });
            
            return deletedProject;
        },
        deleteTask: async (_, { _id}) => {
            const deletedTask = await Task.findByIdAndDelete(_id);
            if (!deletedTask) throw new Error("Project not found");
            return deletedTask;
        },
        updateProject: async (_, args) => {
            const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
                new: true,    
            }); 
            if (!updatedProject) throw new Error("Project not found");
            return updatedProject;
        },
        updateTask: async (_, args) =>{
            const updateTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true,
            });
            if (!updateTask) throw new Error("Task not found");
            return updatedTask;
        },
        finishTask: async (_, args) =>{
            const updatedTask = await Task.findByIdAndUpdate(args._id, {
                finalized: true
            }, {
                new: true,
            });
            
            if (!updatedTask) throw new Error("Task not found");

            pubSub.publish(events.FINALIZED_TASK, { finalizedTask: updatedTask });

            return updatedTask;
        },
        login: async (_, {name, password}) => {

            const data = await User.findOne({name});

            if (data == null) return null

            const login = await compare(password, data.password);

            if(login) {
                pubSub.publish(events.LOGIN, { login: data });
            }

            return login ? data : null
        }
    },
    Project: {
        tasks: async (parent) => await Task.find({projectId: parent._id})
    },
    Task: {
        project: async (parent) => await Project.findById(parent.projectId),
        user: async (parent) => await User.findById(parent.userId)
    },
    Subscription: {
        login: {
            subscribe: () => pubSub.asyncIterator([events.LOGIN])
        },
        allocateTask: {
            subscribe: () => pubSub.asyncIterator([events.ALLOCATE_TASK])
        },
        finalizedTask: {
            subscribe: () => pubSub.asyncIterator([events.FINALIZED_TASK])
        },
        createProject: {
            subscribe: () => pubSub.asyncIterator([events.CREATE_PROJECT])
        },
    }
};