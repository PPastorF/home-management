var filaLixo     = [ "Gab", "Ribs", "Jub", "Kike", "Murilo", "Pastor"];
var comprasDados = [];
var bostasDados  = [ {nome: "Gab",    bostas: 0},
					 {nome: "Ribs",   bostas: 0},
					 {nome: "Jub",    bostas: 0},
					 {nome: "Kike",   bostas: 0},
					 {nome: "Murilo", bostas: 0},
					 {nome: "Pastor", bostas: 0}
					];


function updateTabela(idTabela, valores) {

	tabela = document.getElementById(idTabela);
	tabela.innerHTML = "";

	valores.reverse();

	// Itera todos os elementos do vetor valores
	valores.forEach(function(elem) {
		
		var linha = tabela.insertRow(0);

		// Caso o elemento seja um vetor (linha com mais de uma coluna)
		if (elem.constructor === Array) {

			// Itera todos os elementos de cada elemento
			elem.forEach(function(elem2, i) {	
				
				// Insere uma celula para cada elemento
				var conteudo = linha.insertCell(i);
				conteudo.innerHTML = elem2;
			});	
		}
		else {
			var conteudo = linha.insertCell(0);
			conteudo.innerHTML = elem;			
		}
		
	});

	valores.reverse();
}

function tirouLixo() {

	var newLast = filaLixo.shift();
	filaLixo.push(newLast);

	updateTabela('lixo', filaLixo);
}

function geraTabelaCompras() {
	var botaoRemover = "<button onclick=\"removeCompra(this)\">-</button>";

	var comprasTabela = [];
	comprasDados.forEach( function(elem) {
		var compraElem = [elem, botaoRemover];
		comprasTabela.push(compraElem);
	});
	return comprasTabela;
}

function geraTabelaBostas() {

	var bostasTabela = [];

	bostasDados.forEach( function(elem) {
		
		console.log(elem.nome+";");
		console.log(elem.bostas+";");
		var bostasElem = [
			"<p class='nomeBostas'>" + elem.nome +"</p>",
			"<p class='nroBostas'>" + elem.bostas +"</p>",
			"<button onclick='addBosta(this)' class='botaoAddBostas'> + </button>"
		];

		bostasTabela.push(bostasElem);
	});
	return bostasTabela;
}


function addCompra() {
	
	// Gera o nome da compra e seu botao de remover
	var nomeCompra = document.getElementById("inputCompras").value;

	// Insere a compra no vetor de dados
	comprasDados.push(nomeCompra);

	// Gera vetor para mostrar na tabela
	comprasTabela = geraTabelaCompras();

	// Atualiza tabela de compras
	updateTabela('comprar', comprasTabela);
}

function removeCompra(compra) {

	// Remove a compra do vetor de compras
	var indice = compra.parentNode.parentNode.rowIndex;
	comprasDados.splice(indice, 1);

	// Gera vetor para mostrar na tabela
	comprasTabela = geraTabelaCompras();

	// Atualiza tabela de compras
	updateTabela('comprar', comprasTabela);
}

function addBosta(quem) {

	var index = quem.parentNode.parentNode.rowIndex;

	bostasDados[index].bostas += 1;

	// Gera dados para mostrar na tabela
	var tabelaBostas = geraTabelaBostas();

	// Atualiza tabela de bostas
	updateTabela('bostas', tabelaBostas);
}