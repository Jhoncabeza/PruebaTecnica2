import React, { useEffect, useState } from 'react'
import db from '../firebase/firebase';
import { collection, onSnapshot } from "firebase/firestore";
import { Button, DivBuscador, DivCard, DivCol, DivImagenes, DivPrecio, Img } from '../styles/estilos';


const Main = () => {
    const [state, setState] = useState([])
    const [select, setSelect] = useState("Recientes")
    useEffect(() => {

        const dataTotal = () => {
            if (select === "Recientes") {
                onSnapshot(collection(db, "data"), (snapshot) => {
                    setState(snapshot.docs.map(datas => ({ ...datas.data(), id: datas.id })));
                })
            }
            else if (select === "Mayor Precio") {
                const sortedList = [...state].sort((a, b) => (b.precio - a.precio))
                setState(sortedList)
            } else if (select === "Menor Precio") {
                const sortedList = [...state].sort((a, b) => (a.precio - b.precio))
                setState(sortedList)
            }
        }
        dataTotal()
        // eslint-disable-next-line
    }, [select])

    function cambioSelect(e) {
        setSelect(e.target.value)
    }

    return (

        <DivCol>
            <DivBuscador>
                <div>
                    <input type="text" />
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
