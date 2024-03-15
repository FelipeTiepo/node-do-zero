import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js"
import { title } from "node:process";
import { request } from "node:https";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// POST ADICIONAR VIDEOS    
server.post('/videos', async (request, reply) => {
    const {title, description, duration } = request.body

    await database.create({
        //SHORT SINTEX
        title,
        description,
        duration,
    })
    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search

    const videos = await database.list(search)
    return videos
})

//PUT ATUALIZA VIDEO PELO ID
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })
    return reply.status(204).send()
})

//DELETA VIDEO PELO ID
server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    
    await database.delete(videoId)
    return reply.status(204).send()
})




server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})