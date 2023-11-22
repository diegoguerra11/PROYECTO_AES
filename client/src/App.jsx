import {
          BrowserRouter,
          Route,
          Routes,
          Navigate,
} from 'react-router-dom'
import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path= '/' element ={<Navigate to="/projects" />} />
            <Route path= "projects" element ={<projects/>} />
            <Route path= "projects/:id" element ={<ProjectDetails />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
  )
}


export default App
