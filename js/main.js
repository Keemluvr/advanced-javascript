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
        tabela += '<tr><th scope="row">' + chave + '</th><td>' + formatDesc(lista[chave].desc) + '</td><td>' + lista[chave].quantidade + '</td><td>' + formatValue(lista[chave].valor) + '</td><td> <button class="btn btn-primary" onclick="setUpdate(' + chave + ')">Editar</button> </td></tr>';
    }
    tabela += '</tbody>';
    document.getElementById("lista-tabela").innerHTML = tabela;
}

function formatDesc(desc){
    let str = desc.toLowerCase();
    //posição 0 pois é a primeira letra, slide(a partir dessa posição)
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value){
    //toFixed(2 números após o ponto)
    let str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "$ " + str;
    return str;
}

function addData(){
    let desc = document.getElementById("desc").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    //uncshift - adiciona em primeiro na lista
    lista.unshift({"desc": desc, "quantidade": quantidade, "valor": valor})
    //atualiza lista
    setList(lista);
}

function setUpdate(id){
    let obj = lista[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("quantidade").value = obj.quantidade;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btn-update").style.display = "inline-block";
    document.getElementById("btn-add").style.display = "none";

    document.getElementById("inputIdAtualizar").innerHTML = '<input id="idAtualizar" type="hidden" value="' + id + '">';
}

function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btn-update").style.display = "none";
    document.getElementById("btn-add").style.display = "inline-block";
    document.getElementById("inputIdAtualizar").innerHTML = "";
}

function updateData(){
    let id = document.getElementById("idAtualizar").value;
    let desc = document.getElementById("desc").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    lista[id] = { "desc": desc, "quantidade": quantidade, "valor": valor };
    resetForm();
    setList(lista); //Atualiza lista
}

setList(lista);
console.log(getTotal(lista));