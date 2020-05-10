//constantes
const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const quartos = document.querySelector("#quartos");

//variaveis
let PaginaAtual = 1;
let numeroPaginas = 0;
let ObjetosPorPagina = 6;
let db = [];

//script para paginação -> Inicio

function paginacaoEvent() {
	document.getElementById("proximo").disabled = PaginaAtual === numeroPaginas ? true : false;
    document.getElementById("anterior").disabled = PaginaAtual === 1 ? true : false;
}

function getNumeroDePaginas(data) {
	numeroPaginas = Math.ceil(data.length / ObjetosPorPagina);
}

function carregarObjetos(data) {
	let inicio = ((PaginaAtual - 1) * ObjetosPorPagina);
    let final = inicio + ObjetosPorPagina;
	let datas = Object.keys(data)
		.slice(inicio, final)
		.reduce((result, key) => {
            result.push(data[key]);
            return result;
		}, []);
	paginacaoEvent();
	return datas;
};

function proximo(data) {
	PaginaAtual += 1;
	getNumeroDePaginas(data);
};

function voltar(data) {
	PaginaAtual -= 1;
	getNumeroDePaginas(data);
};
//script para paginação -> Fim

//script para renderizar Cards -> Inicio
async function fetchQuartos() {
    return await fetch(url).then(async (x) => await x.json());
}

function renderCards(dados) {
    let itens = carregarObjetos(dados);
    quartos.innerHTML = "";
    itens.map(renderDiv);
}

function renderDiv(dados) {
    const div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `
                <img id="foto" src="${dados.photo}" class="card-img-top" alt="" />
                <p id="tipo">${dados.property_type}</p>
                <h6 class="h6">${dados.name}</h6>
                <p id="preco">Preço por noite: <b>R$ ${dados.price},00</b></p>   
    `;
    quartos.appendChild(div);  
}
//script para renderizar Cards -> Fim

//script do APP / Main
async function App() {
    let proxima = document.getElementById("proximo");
    let anterior = document.getElementById("anterior");

    db = await fetchQuartos();

    proxima.onclick = () => {
        proximo(db);
        renderCards(db);
    }

    anterior.onclick = () => {
        voltar(db);
        renderCards(db);
    }

    if(db[0]) {
        renderCards(db);
    }
}

window.onload = App;