var filaLixo = ["Pastor", "Murilo", "Kike", "Jub", "Ribs", "Gab"];

function updateTabela(idTabela, valores) {

	tabela = document.getElementById(idTabela);
	tabela.innerHTML = "";

	valores.forEach(function(elem, indice, vetor) {
		var linha = tabela.insertRow(0);
		var texto = linha.insertCell(0);

		if (indice == vetor.length-1) {
			linha.setAttribute('class', "proximo");
		}

		texto.innerHTML = elem;
	});
}

function tirouLixo() {

	let newLast = filaLixo.pop();
	filaLixo.unshift(newLast);
	updateTabela("lixo", filaLixo);
}

function addCompra() {
	
	var tabela = document.getElementById("comprar");
	var txt = document.getElementById("inputCompras").value;

	var compra = tabela.insertRow(tabela.rows.length);
	var botao  = compra.insertCell(0);
	var texto  = compra.insertCell(0);

	texto.innerHTML = txt;
	botao.innerHTML = "<button onclick=\"removeCompra(this)\">-</button>";
}

function removeCompra(compra) {

	var indice = compra.parentNode.parentNode.rowIndex;
	document.getElementById("comprar").deleteRow(indice);
}

function addBosta(quem) {
	var qtd = document.getElementById(quem).innerHTML;
	qtd = parseInt(qtd);
	qtd += 1;
	document.getElementById(quem).innerHTML = qtd;
}