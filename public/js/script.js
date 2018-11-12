function updateTabela(idTabela, valores) {

	tabela = document.getElementById(idTabela);
	tabela.innerHTML = "";

	valores.reverse();

	// Itera todos os elementos do vetor dados
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


function geraTabelaCompras(dados) {
	var botaoRemover = "<button onclick=\"requestRemoveCompra(this)\">-</button>";

	var comprasTabela = [];

	dados.forEach( function(elem) {
		var compraElem = [elem, botaoRemover];
		comprasTabela.push(compraElem);
	});
	
	return comprasTabela;
}

function geraTabelaLixo(dados) {

	var lixoTabela = [];

	dados.forEach( function(elem) {
		lixoTabela.push(elem.nome);
	});

	return lixoTabela;
}

function geraTabelaBostas(dados) {

	var bostasTabela = [];

	dados.forEach( function(elem) {
		
		var bostasElem = [
			"<p class='nomeBostas'>" + elem.nome +"</p>",
			"<p class='nroBostas'>" + elem.bostas +"</p>",
			"<button onclick='requestAddBosta(this)' class='botaoAddBostas'> + </button>"
		];

		bostasTabela.push(bostasElem);
	});
	return bostasTabela;
}

function requestAddCompra() {
	
	var nomeCompra = document.getElementById("inputCompras").value;

	// Gera vetor para mostrar na tabela
	comprasTabela = geraTabelaCompras();

	// Atualiza tabela de compras
	updateTabela('comprar', comprasTabela);
}

function requestRemoveCompra(compra) {

	// Gera dados para mostrar na tabela
	comprasTabela = geraTabelaCompras();

	// Atualiza tabela de compras
	updateTabela('comprar', comprasTabela);
}

function requestAndaFilaLixo() {

	// Request
	var request = new XMLHttpRequest();
	var url = 'http://localhost:8080/andaFilaLixo';

	request.open('GET', url);
	request.responseType = 'text';

	request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
			var dados = JSON.parse(request.responseText);

			// Atualiza a tabela de lixos
			lixoTabela = geraTabelaLixo(dados);
			updateTabela('lixo', lixoTabela);
		}
	}
	request.send();

}

function requestAddBosta(quem) {

	moradorNome = quem.parentNode.parentNode.cells[0].firstChild.innerHTML;

	// Request
	var request = new XMLHttpRequest();
	var url = 'http://localhost:8080/addBosta';

	var param = "nome="+moradorNome;

	request.open('post', url);
	request.responseType = 'text';
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
			var dados = JSON.parse(request.responseText);
			
			var tabelaBostas = geraTabelaBostas(dados);
			updateTabela('bostas', tabelaBostas);
		}
	}
	request.send(param);

}