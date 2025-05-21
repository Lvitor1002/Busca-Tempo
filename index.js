import { ApiRepository } from './ApiRepository.js'

const campoDescricao = document.getElementById("idDescricao")
const cidadeInput = document.getElementById("idcidade")
const btnPesquisar = document.getElementById("idbtnpesquisar")


const campoNomeCidade = document.getElementById("idNomeCidade")
const campoTemperaturaCidade = document.getElementById("idTemperatura")
const campoDescricaoCondicao = document.getElementById("idDescricaoCondicao")
const valorUmidade = document.querySelector("#idUmidade .valor-umidade");
const iconeVento = document.querySelector("#idVento i")

const sugestoes = document.querySelectorAll(".sugestoes button")


const api = new ApiRepository()

btnPesquisar.addEventListener("click",async function(evento){

    const cidade = cidadeInput.value.trim() 

    if (cidade === "" || !/^[A-Za-zÀ-ÿ\s]+$/i.test(cidade)) {

        campoDescricao.classList.add("ocultar")

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Não foi possível encontrar uma cidade com este nome.`,
        });
        return
    }

    try {

        await buscarDados(cidade)
        cidadeInput.value = ""

    } catch (erro) {

        // Erro já tratado internamente
    }
    
})


async function buscarDados(cidade) {
    
    try {
        const dados = await api.buscarDados(cidade);
        
        if (!dados || dados.name === undefined){
            campoDescricao.classList.add("ocultar") 
            return
        }
        
        campoNomeCidade.textContent = dados.name
        campoDescricaoCondicao.textContent = dados.weather[0].description
        campoTemperaturaCidade.textContent = `${parseInt(dados.main.temp)}°C`
        valorUmidade.textContent = `${dados.main.humidity}%`
        iconeVento.textContent = `${dados.wind.speed}Km/h`
        
        campoDescricao.classList.remove("ocultar")
        

    } catch (erro) { 

        campoDescricao.innerHTML = ""
        campoDescricao.classList.add("ocultar") // Oculta em caso de erro

        console.error("Erro ao exibir dados:", erro)
    }

}

sugestoes.forEach((pais) => {
    
    pais.addEventListener("click", function(evento){

        const escolhido = evento.target.textContent

        cidadeInput.value = escolhido
        
    })
})