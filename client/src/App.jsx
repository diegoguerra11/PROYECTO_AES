import {ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import React from 'react'
import {Projects} from "./pages/Projects";
import {ProjectDetails} from "./pages/ProjectDetails";

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache(),
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
