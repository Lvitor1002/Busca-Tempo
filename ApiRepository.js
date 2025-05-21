export class ApiRepository{

    
    async buscarDados(cidade){
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=f21a8d622729b65c5c64a547cdfc80b6&lang=pt_br`

        try{
            const respostaApi = await fetch(url)
            
            if(!respostaApi.ok){
                
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Verifique o nome da cidade..`,
                });
                throw new Error("Cidade não encontrada");
                
            }

            const dados = await respostaApi.json()
            return dados

        }catch(erro){

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            return
        }
    }
}