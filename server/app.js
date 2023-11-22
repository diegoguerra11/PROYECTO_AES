import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'

import express from 'express'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

export async function startApolloServer(typeDefs, resolvers) {

    const app = express()
    const httpServer = http.createServer(app);

    app.get('/', (req, res) => res.send('Welcome to my API'))

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Crear un servidor WebSocket
    const wsServer = new WebSocketServer({
        // Es el servidor creado previamente.
        server: httpServer,
        //Ruta distinta para las suscripciones
        path: '/subscriptions',
    });
  
    //Obtiene el schema creado y el servidor WebSocket empieza a escuchar
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            // Apagado adecuado del servidor HTTP.
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // Apagado adecuado del servidor WebSocket.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ]
    });
    
    await server.start()
    
    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

    await new Promise(resolve => httpServer.listen({
        port:4000
    }, resolve))

    console.log('Server 4000')
}