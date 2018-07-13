let lista = [
    {"desc":"rice", "quantidade":"1", "valor":"5.40"},
    {"desc":"beer", "quantidade":"12", "valor":"1.99"},
    {"desc":"carne", "quantidade":"1", "valor":"15.00"}
];

function getTotal(lista){
    let total = 0;
    for(let chave in lista){
        total += lista[chave].valor * lista[chave].quantidade;
    }
    return total;
};

function setList(lista){
    let tabela = '<thead><tr><th scope="col">Item</th><th scope="col">Produto</th><th scope="col">Quantidade</th><th scope="col">Valor</th><th scope="col">Ação</th></tr></thead><tbody>';
    for(let chave in lista){
        tabela += '<tr><th scope="row">' + chave + '</th><td>' + lista[chave].desc + '</td><td>' + lista[chave].quantidade + '</td><td>' + lista[chave].valor + '</td> <td></td></tr>';
    }
    tabela += '</tbody>';
    document.getElementById("lista-tabela").innerHTML = tabela;
}

setList(lista);
console.log(getTotal(lista));