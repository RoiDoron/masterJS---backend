import path from 'path';
import cors from 'cors';

import express from 'express'
import { codeService } from './services/code.service.js';
import { loggerService } from './services/logger.service.js';

const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:5173',
        'http://localhost:5173'
    ],
    credentials: true
}

// Express Config:
app.use(express.static('public'))
app.use(express.json())
app.use(cors(corsOptions))

// Express Routing 

// Code Block List
app.get('/api/code', (req, res) => {
    codeService.query()
        .then((codes) => {
            res.send(codes)
        })
        .catch((err) => {
            loggerService.error('Cannot get codes', err)
            res.status(400).send('Cannot get codes')
        })
})

app.get('/api/code/:codeId', (req, res) => {
    console.log('hi')
    const { codeId } = req.params

    codeService.getById(codeId)
        .then((code) => {
            res.send(code)
        })
        .catch((err) => {
            loggerService.error('Cannot get code', err)
            res.status(400).send('Cannot get code')
        })

})


app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})



const PORT = 3030
app.listen(PORT, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)
