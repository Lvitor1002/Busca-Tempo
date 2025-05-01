

const inputCidade = document.getElementById("idcidade")
const btnPesquisar = document.getElementById("idbtnpesquisar")
const campoGeral = document.getElementById("idDescricao")

let campoCidade = document.getElementById("idNomeCidade")
let campoTemperatura = document.getElementById("idTemperatura")
let campoDescricao = document.getElementById("idDescricaoCondicao")
let campoUmidade = document.querySelector("#idUmidade i")
let campoVento = document.querySelector("#idVento i")

let campoErro = document.getElementById("msgErro")

let paisesSugestoes = document.querySelectorAll(".sugestoes button")


btnPesquisar.addEventListener("click",function(evento){
    
    let cidade = inputCidade.value
    ExibirDadosTempo(cidade)
    
})

async function BuscaAPI(cidade){
    
    const urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=f21a8d622729b65c5c64a547cdfc80b6&lang=pt_br`

    const resposta = await fetch(urlAPI) 
    const dados = await resposta.json()

    return dados
}

async function ExibirDadosTempo(cidade){

    const dados = await BuscaAPI(cidade)

    if(dados.name === undefined){
        campoErro.classList.remove("ocultar")
        campoGeral.classList.add("ocultar")
        return
    }
    campoErro.classList.add("ocultar")  

    campoCidade.innerText = dados.name
    campoTemperatura.innerText = `${parseInt(dados.main.temp)}°C` 
    campoDescricao.innerText = dados.weather[0].description
    campoUmidade.innerText = `${dados.main.humidity}%`
    campoVento.innerText = `${dados.wind.speed}Km/h`


    campoGeral.classList.remove("ocultar")
}

inputCidade.addEventListener("keyup",function(evento){

    //Verificando se foi pressionado o ENTER para seguir..
    if(evento.code === "Enter"){

        let cidade = evento.target.value
        
        ExibirDadosTempo(cidade)
    }

})


paisesSugestoes.forEach((pais)=>{

    pais.addEventListener("click",function(evento){
        inputCidade.value = evento.target.textContent
    })
})


