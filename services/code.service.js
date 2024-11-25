
import fs from 'fs'
import { utilService } from './util.service.js'
import { loggerService } from './logger.service.js'

export const codeService = {
    query,
    getById,
    remove,
    save
}

const codes = utilService.readJsonFile('data/codes.json')

function query() {
    return Promise.resolve(codes)
}

function getById(codeId) {
    const code = codes.find(code => code._id === codeId)
    return Promise.resolve(code)
}

function remove(codeId) {
    const idx = codes.findIndex(code => code._id === codeId)
    if (idx === -1) return Promise.reject('No Such code')
    const code = codes[idx]
    codes.splice(idx, 1)
    return _saveCodesToFile()
}

function save(code) {
    if (code._id) {
        const idx = codes.findIndex(currCode => currCode._id === code._id)
        codes[idx] = { ...codes[idx], ...code }
    } else {
        code._id = utilService.makeId()
        codes.push(code)
    }

    return _saveCodesToFile().then(() => code)
}


function _saveCodesToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(codes, null, 4)
        fs.writeFile('data/code.json', data, (err) => {
            if (err) {
                loggerService.error('Cannot write to codes file', err)
                return reject(err)
            }
            resolve()
        })
    })
}
