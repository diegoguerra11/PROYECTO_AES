import { startApolloServer } from './app.js'
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers.js'
import {connectDB} from './db.js'

connectDB()

startApolloServer(typeDefs, resolvers);

// QUE SE PUEDAN PONER NOMBRES Y APELLIDOS
// QUE SE PUEDA VER CADA NUEVA CONEXION AL SITIO WEB
// QUE LAS TAREAS TENGAN UN SE PUEDEN CONCLUIR (ENVIAR NOTIFICACION)
// ENVIAR NOTIFICACION POR CADA MENSAJE A LAS TAREAS (ENVIAR NOTIFICACION)
