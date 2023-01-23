import React, { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setGastoEditar,
    animarModal, 
    setModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar 
}) => {

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

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState()

    useEffect(()=> {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

    const handleOcultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje('')                
            }, 1500);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CerrarBtn}
                 alt="Cerrar modal"
                 onClick={handleOcultarModal} 
                 />
            </div>
            <form
             onSubmit={handleSubmit}
             className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
             >
                <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
                { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre del Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad gastada</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del gasto'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Categoria</label>
                    <select
                        id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        {opcionesCategoria.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.texto}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
                ></input>
            </form>
        </div>
    )
}

export default Modal