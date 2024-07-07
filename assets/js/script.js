let btnBuscar = document.getElementById("btnbuscar")
let resultado = document.querySelector(".resultado")

// LLamado a la API
async function getMindicador(x){
    const res = await fetch(`https://mindicador.cl/api/${x}`)
    const data = await res.json()
    // console.log(data[x]);
    // return (data[x])
    return (data)
}



// funcion que guarda el grafico
const crearGrafico = async (series) =>{
    console.log(series);
    const data = series.map(serie => serie.valor)
    const labels = series.map(serie => serie.fecha)
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
                borderWidth: 1
            }]
        },
    });
    }


btnBuscar.addEventListener("click", async() =>{

    // elimina el grafico y carga uno nuevo
    let grafico = Chart.getChart("myChart")
    if (grafico != undefined ){
        grafico.destroy()
    }

    let clpInput = document.getElementById("clp").value
    let moneda = document.getElementById("moneda").value
    let tipoDeMoneda = await getMindicador(moneda) 
    let cambio = tipoDeMoneda.serie[0].valor * clpInput
    resultado.innerHTML = new Intl.NumberFormat("de-DE").format(cambio.toFixed())
    crearGrafico(tipoDeMoneda.serie)
})





  