var express = require('express');
var bodyParser = require('body-parser'); 
var fs = require('fs');
var path = require('path');
var app = express();
var port = 8080;


var compras  = { count: 0, dados: [] };
var filaLixo = [ {nome: "Gab"}, {nome: "Ribs"}, {nome: "Jub"}, {nome: "Kike"}, {nome: "Murilo"}, {nome: "Pastor"} ];
var moradores = [{id: 0, nome: "Gab",	 vacilos: 0},
				 {id: 1, nome: "Ribs",	 vacilos: 0},
				 {id: 2, nome: "Jub",    vacilos: 0},
				 {id: 3, nome: "Kike",   vacilos: 0},
				 {id: 4, nome: "Murilo", vacilos: 0},
				 {id: 5, nome: "Pastor", vacilos: 0}
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
	var dados = JSON.stringify(compras.dados);
	res.send(dados);
});

app.post('/addCompra', function(req, res) {
	
	// Opera sobre os dados
	addCompra(req.body.nomecompra);

	// Retorna os dados
	var dados = JSON.stringify(compras.dados);
	res.send(dados);
});

app.post('/removeCompra', function(req, res) {
	
	// Opera sobre os dados
	removeCompra(req.body.idcompra);

	// Retorna os dados
	var dados = JSON.stringify(compras.dados);
	res.send(dados);
});

app.get('/vacilos', function(req, res) {

	// Retorna os dados
	var dados = JSON.stringify(moradores);
	res.send(dados);
});

app.post('/addVacilo', function(req, res) {

	// Descobre o id do morador
	var morador = moradores.find( function(elem) { 
		return elem.nome == req.body.nome;
	});
	
	// Opera sobre os dados
	incVacilos(morador.id);

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

	var indice = compras.dados.findIndex( function(elem) {
		return elem.id == idCompra;
	});
	
	compras.dados.splice(indice, 1);

	if (compras.dados.length == 0) {
		compras.count = 0;
	}
}

function andaFila() {

	var aux = filaLixo.shift();
	filaLixo.push(aux);
}

function incVacilos(idMorador) {

	var indice = moradores.findIndex(elem => elem.id == idMorador);
	moradores[indice].vacilos += 1;
}