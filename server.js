var express = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var path = require('path');
var app = express();
var port = 8080;

var compras  = { count: 0, dados: [] };
var filaLixo = [ {nome: "Gab"}, {nome: "Ribs"}, {nome: "Jub"}, {nome: "Kike"}, {nome: "Murilo"}, {nome: "Pastor"} ];
var moradores = [{id: 0, nome: "Gab",	 bostas: 0},
				 {id: 1, nome: "Ribs",	 bostas: 0},
				 {id: 2, nome: "Jub",    bostas: 0},
				 {id: 3, nome: "Kike",   bostas: 0},
				 {id: 4, nome: "Murilo", bostas: 0},
				 {id: 5, nome: "Pastor", bostas: 0}
				];


app.use(bodyParser.urlencoded({
    extended: true
}));

//----------------------------------------
app.get('/lixo', function(req, res) {

	// Retorna os dados
	var dados = JSON.stringify(filaLixo);
	res.send(dados);
});

app.get('/andaFilaLixo', function(req, res) {

	// Realiza a operacao
	andaFila();

	// Retorna os dados
	var dados = JSON.stringify(filaLixo);
	res.send(dados);
});

app.get('/compras', function(req, res) {

	// Retorna os dados
	var dados = JSON.stringify(compras);
	res.send(dados);
});

app.post('/addCompra', function(req, res) {

	// Retorna os dados
	var dados = JSON.stringify(compras);
	res.send(dados);
});

app.get('/bostas', function(req, res) {

	// Retorna os dados
	var dados = JSON.stringify(moradores);
	res.send(dados);
});

app.post('/addBosta', function(req, res) {

	// Descobre o id do morador
	var morador = moradores.find( function(elem) { 
		return elem.nome == req.body.nome;
	});
	
	// Opera sobre os dados
	incBostas(morador.id);

	// Retorna os dados
	var dados = JSON.stringify(moradores);
	res.send(dados);
});
//----------------------------------------

app.use(express.static(path.join('public')));

app.listen(port, function () {
  console.log('Listening on port '+ port +'...')
});


function addCompra(nomeCompra) {

	var idCompra = compras.count;
	compras.count += 1;

	var compra = {nome: nomeCompra, id: idCompra};
	compras.dados.push(compra);
}

function removeCompra(idCompra) {

	var indice = compras.dados.findIndex(elem => elem.id == idCompra);
	comprasDados.splice(indice, 1);

	if (compras.dados.length == 0) {
		compras.count = 0;
	}
}

function andaFila() {

	var aux = filaLixo.shift();
	filaLixo.push(aux);
}

function incBostas(idMorador) {

	var indice = moradores.findIndex(elem => elem.id == idMorador);
	moradores[indice].bostas += 1;
}