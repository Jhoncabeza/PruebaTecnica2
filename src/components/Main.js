import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { Button, DivBuscador, DivCard, DivCol, DivImagenes, DivPrecio, Img } from '../styles/estilos';


const Main = () => {
    const [state, setState] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [select, setSelect] = useState("Recientes");
    const [search, setSearch] = useState("")

    useEffect(() => {

        const dataTotal = () => {
            if (select === "Recientes" ) {
                onSnapshot(collection(db, "data"), (snapshot) => {
                    setState(snapshot.docs.map(datas => ({ ...datas.data(), id: datas.id })));
                    setDataSearch(snapshot.docs.map(datas => ({ ...datas.data(), id: datas.id })))
                })
            }
            else if (select === "Mayor Precio") {
                const sortedList = [...state].sort((a, b) => (b.precio - a.precio))
                setState(sortedList)
                setDataSearch(sortedList)
            } else if (select === "Menor Precio") {
                const sortedList = [...state].sort((a, b) => (a.precio - b.precio))
                setState(sortedList)
                setDataSearch(sortedList)
            }
        }
        dataTotal()
        // eslint-disable-next-line
    }, [select])

    function Search(e) {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        // eslint-disable-next-line
        const resultadosBusqueda = dataSearch.filter((elemento) => {
            
            if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento
            }
        })
        setState(resultadosBusqueda)
    } 
    
    
    function cambioSelect(e) {
        setSelect(e.target.value)
    }
    
    return (

        <DivCol>
            <DivBuscador>
                <div>
                    <input value={search} onChange={Search} type="text" placeholder="Ingrese un nombre"/>
                </div>
                <div>
                    <select value={select} onChange={cambioSelect}>
                        <option>Recientes</option>
                        <option>Mayor Precio</option>
                        <option>Menor Precio</option>
                    </select>
                </div>
            </DivBuscador>
            <DivImagenes>           {
                state.map((doc) => (
                    <DivCard key={doc.id} >
                        <Img src={doc.image} alt="" />
                        <DivPrecio>
                            <p>{doc.nombre}</p>
                            <p>R $ {doc.precio}</p>
                        </DivPrecio>
                        <Button>COMPRAR</Button>
                    </DivCard>
                ))
            }
            </DivImagenes>

        </DivCol>
    )
}

export default Main
