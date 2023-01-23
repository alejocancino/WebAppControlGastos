import React,{useState, useEffect} from 'react'


const Filtros = ({filtro, setFiltro}) => {
    const opcionesCategoria = [
        {
            value:"",
            texto:"Seleccione",
        },
        {
            value:"comida",
            texto:"Comida",
        },
        {
            value:"ahorro",
            texto:"Ahorro",
        },
        {
            value:"casa",
            texto:"Casa",
        },
        {
            value:"gastos",
            texto:"Gastos varios",
        },
        {
            value:"ocio",
            texto:"Ocio",
        },
        {
            value:"salud",
            texto:"Salud",
        },
        {
            value:"suscripciones",
            texto:"Suscripciones",
        },
        ]
    return (
    <div className='filtros sombra contenedor'>
        <form >
            <div className='campo'>
                <label>Filtrar campo</label>
                <select
                 value={filtro}
                 onChange={e => setFiltro(e.target.value)}
                >
                    {opcionesCategoria.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.texto}</option>
                        ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros