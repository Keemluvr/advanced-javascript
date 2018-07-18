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
        tabela += '<tr><th scope="row">' + chave + '</th><td>' + formatDesc(lista[chave].desc) + '</td><td>' + formQuantidade(lista[chave].quantidade) + '</td><td>' + formatValue(lista[chave].valor) + '</td><td> <button class="btn btn-primary" onclick="setUpdate(' + chave + ')">Editar</button>  <button class="btn btn-danger" onclick="deleteData(' + chave + ')">Excluir</button> </td></tr>';
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
    if(!validation()){
        return;
    }
    let desc = document.getElementById("desc").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    //uncshift - adiciona em primeiro na lista
    lista.unshift({"desc": desc, "quantidade": quantidade, "valor": valor})
    resetForm();
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
    document.getElementById("alert-validation").style.display = "none";
}

function updateData(){
    if(!validation()){
        return;
    }
    let id = document.getElementById("idAtualizar").value;
    let desc = document.getElementById("desc").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    lista[id] = { "desc": desc, "quantidade": quantidade, "valor": valor };
    resetForm();
    setList(lista); //Atualiza lista
}

function deleteData(id){
    resetForm(); //para caso tenha algo editando na hora de apagar algo
    if(confirm("Deletar este item?")){
        if(id == lista.length - 1){
            lista.pop(); //tira o último
        }else if(id == 0){
            lista.shift(); //tira o primeiro
        }else{
            let arrayAuxIni = lista.slice(0,id); //inicio até o id
            let arrAuxEnd = lista.slice(id + 1); //do id em diante
            lista = arrayAuxIni.concat(arrAuxEnd);
        }
        setList(lista);

    }
}

function formQuantidade(valor){
    return parseInt(valor);
}

function validation(){
    let desc = document.getElementById("desc").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;
    let errors = "";
    document.getElementById("alert-validation").style.display = "none";
    if(desc === ""){
        errors += '<p>Preencha o campo da descrição do produto</p>';
    }
    if(quantidade === ""){
        errors += '<p>Preencha o campo da quantidade do produto</p>';
    }else if(quantidade != parseInt(quantidade)){
        errors += '<p>Preencha o campo da quantidade do produto com uma quantidade válida</p>';
    }
    if(valor === ""){
        errors += '<p>Preencha o campo do valor do produto</p>';
    }else if(valor != parseFloat(valor)){
        errors += '<p>Preencha o campo do valor do produto com um valor válido</p>';
    }

    if(errors != ""){
        document.getElementById("errors").innerHTML = errors;
        document.getElementById("alert-validation").style.display = "block";
        return 0;
    }else{
        return 1;
    }

}

setList(lista);
console.log(getTotal(lista));