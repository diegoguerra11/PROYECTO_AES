import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split, useSubscription } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { Login } from "./pages/Login";
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

// APOLLO CLIENT SEGÚN EL TIPO DE PETICION USA EL PROTOCOLO WEB SOCKET O HTTP
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
              <Route path='/' element={<Navigate to="/login"/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/projects' element={<Projects/>}></Route>
              <Route path='/projects/:id' element={<ProjectDetails/>}></Route>
            </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}


export default App
