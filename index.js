const express = require('express')
const data = require('./candidatos.json')
const fs = require('fs')

const api = express()

const HOST = 'localhost'
const PORT = 8888

var candidatos = JSON.parse(fs.readFileSync('./candidatos.json', 'utf-8'));

api.get('/', (req,res) => {
    res.send('API de Candidatos a Presidente do Brasil (<b>2022</b>).<br />Utilize <b>/candidatos</b> para consultar a lista completa.<br />Utilize <b>/candidato/&lt;NúmeroDaUrna&gt;</b> para consultar um candidato específico.<br />Código fonte disponível no <a href="https://github.com/sudanoj/candidatos-2022">meu GitHub</a>.');
})

api.get('/candidatos', (req,res) => {
    res.status(200).json(data);
})

api.get('/candidato/:numero', (req,res) => {
    var numero = + req.params.numero;
    var candidato = candidatos.find(c => c.numero === numero);
    if(candidato == null) return res.send('Candidato não encontrado, utilize <b>/candidatos</b> para consultar a lista completa.');
    res.send(candidato);
})

api.get('/candidato/:numero/:json_field', (req,res) => {
    var numero = + req.params.numero;
    var candidato = candidatos.find(c => c.numero === numero);
    if(candidato == null) return res.send('Candidato não encontrado, utilize <b>/candidatos</b> para consultar a lista completa.');
    var field = req.params.json_field;
    if(candidato[field] == null) return res.send('Informação não encontrada, utilize <b>/candidatos</b> para consultar a lista completa.');
    res.send(candidato[field]);
})


api.listen(PORT, () => console.log(`Instância iniciada, rodando API de consultas em ${HOST}:${PORT}!`))