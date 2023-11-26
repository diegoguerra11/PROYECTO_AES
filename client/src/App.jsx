import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from "@apollo/client";
import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import React from 'react'
import { Projects } from "./pages/Projects";
import { ProjectDetails } from "./pages/ProjectDetails";
import { getMainDefinition } from "@apollo/client/utilities";

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const httpLink = createHttpLink({
  uri:'http://localhost:4000/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true 
  }
}));

const splitLink = split(({query}) => {
  const definiton = getMainDefinition(query)
  return (
    definiton.kind == 'OperationDefinition' &&
    definiton.operation == 'subscription'
  )
}, wsLink, httpLink)

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink
})


function App() {
  return (
    
    <ApolloProvider client={client}>
      <BrowserRouter>
       <div className="container m-auto h-screen flex items-center justify-center">
       <Routes>
          <Route path='/' element={<Navigate to="/projects"/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/projects/:id' element={<ProjectDetails/>}></Route>
        </Routes>
       </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}


export default App
