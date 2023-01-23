import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Swal from 'sweetalert2'


const ControlPresupuesto = ({ 
    presupuesto, 
    gastos, 
    setGastos,
    setPresupuesto,
    setIsValidPresupuesto
}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);

        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 700);
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: "currency", currency: "USD"
        })
    }

    const  handleResetApp = () => {
        Swal.fire({
            title: '¿Seguro desea resetear la app?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, resetear'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Tu aplicación ha sido reseteada.',
              )
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
            }
          })
          
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        textColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor : '#f5f5f5',
                    
                    })}
                    text={`${porcentaje}% Gastado`}
                    value={porcentaje}
                />
            </div>
            <div className='contenido-presupuesto'>
            <button 
                className='reset-app'
                onClick={handleResetApp}
                type='button'>
                Resetear App
            </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ""}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto