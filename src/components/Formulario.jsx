import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function Formulario() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        cuantos: '',
        fecha: ''
    });

    const [datosTabla, setDatosTabla] = useState([]);

    useEffect(()=>{
        cargarDatos();
    },[])

    const handleInputChange = (event) => {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    const guardarReservacion = async (event) => {
        event.preventDefault();
        console.log(formulario);
        const docRef = await addDoc(collection(db, 'reservaciones'), formulario);
        console.log("Documento agregado con el ID", docRef.id);
        limpiarFormulario();
    }

    const limpiarFormulario = () => {
        setFormulario({
            nombre: '',
            cuantos: '',
            fecha: ''
        });
        console.log(formulario);
    }

    const cargarDatos = async ()=>{
        console.log("Entro a cargar datos...");
        const querySnapshot = await getDocs(collection(db, 'reservaciones'));
        let datosFormateados = querySnapshot.docs.map((doc)=>{
            // console.log(doc.id, "=>",doc.data())
            return doc.data();
        });
        setDatosTabla(datosFormateados);
        console.log(datosFormateados);
    }

    return (
        <>
            <form onSubmit={guardarReservacion}>
                <div className="mb-3">
                    <label className="form-label">Nombre quien reserva</label>
                    <input type="text" className="form-control" name='nombre' onChange={handleInputChange} />
                    <div className="form-text text-danger">Esta persona debe presentarse el dia de la cita.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">¿Reserva para cuantas personas?</label>
                    <input type="text" className="form-control" name='cuantos' onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha Reserva</label>
                    <input type="date" className="form-control" name='fecha' onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <hr />
            <h2 className='text-center mt-4'>Lista de reservaciones</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Reserva</th>
                        <th>Personas</th>
                        <th>Fecha Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosTabla.map((row,index)=>{
                            return (
                            <tr key={index}>
                                <th>{index}</th>
                                <td>{row.nombre}</td>
                                <td>{row.cuantos}</td>
                                <td>{row.fecha}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    );
}

export default Formulario;