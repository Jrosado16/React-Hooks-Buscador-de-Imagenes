import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import ListaImagenes from '../components/ListaImagenes';
import Spinner from '../components/Spinner';
import Error from '../components/Error';

const Inicio = () => {
    //definimos nuestro state
    const [ busqueda, guardarBusqueda ] = useState('');
    const [ error, guardarError ] = useState(false);
    const [imagenes, guardarImagenes] = useState([]);
    const [totalPaginas, guardarTotalPaginas] = useState(1);
    const [paginaActual, guardarPaginaActual] = useState(1);
    const [Loader, guardarLoader] = useState(false);
    const [mensaje, guardarMensaje] = useState('');

    //se ejecuta cuando hay cambios en el state en este caso en busqueda y al paginar
    useEffect(() => {

        //consultamos la API
        const consultarAPI = () => {

            if(busqueda === '') {
                return;
            }
            
            const imgPorPagina = 30;
            const API = process.env.API || '';
            
            if(!API) {
                alert('Hubo un problema revisar api')
            };
            
            const url = `https://pixabay.com/api/?key=${API}&q=${busqueda}&per_page=${imgPorPagina}&page=${paginaActual}`;
            guardarLoader(true)
            fetch(url, {
                method: 'GET'
            })
            .then(data => data.json())
            .then(res => {
                guardarLoader(false);
                guardarImagenes(res.hits);

                //vlidar que encuentre imagenes
                if(res.hits.length === 0){
                    guardarMensaje('No hay Imaganes');
                    guardarTotalPaginas(1);
                }else{
                    //Calcular el total de las paginas
                    const calcularTotalPaginas = Math.ceil(res.totalHits / imgPorPagina);
                    guardarTotalPaginas(calcularTotalPaginas);
                    guardarMensaje('');
                }
            })
        }
        consultarAPI();
    }, [busqueda, paginaActual])

    //obtenemos los datos del form
    const obtenerDatos = (e) =>{
        e.preventDefault();
        e.persist()
        if(e.target.elements[0].value === ''){
            guardarError(true);
            console.log('error')
        }else{
            guardarError(false);
            guardarBusqueda(e.target.elements[0].value);

        }
    }

    //definimos la pagina anterior
    const paginaAnterior = () => {
        const nuevaPagina = paginaActual - 1;
        if(totalPaginas < 1) return null;

        guardarPaginaActual(nuevaPagina);
    }

    //definimos la pagina siguiente
    const paginaSiguiente = () => {
        const nuevaPagina = paginaActual + 1;
        if(nuevaPagina > totalPaginas) return null;

        guardarPaginaActual(nuevaPagina);
   }

   let cargarSpinner = null;
   //Cargamos un spinner
   cargarSpinner = (Loader === true ? cargarSpinner = <Spinner /> : null);

   let nuemeroPaginas = null;
   //Mostramos la pagina actual y la cantidad de paginas
   nuemeroPaginas = (totalPaginas > 1 ? nuemeroPaginas = <p className="text-white">{paginaActual} - {totalPaginas} Paginas</p> : null);

   //mostrar mensaje si no hay imagenes
   let mensajeDatos = null;
   mensajeDatos = <p className="display-4 text-white">{mensaje}</p>;
   

    return ( 
        <div className="container">
            <div className="jumbotron bg-dark text-white">
                <h2 className="text-center">Buscador de Imagenes con React</h2>
                <Formulario 
                    obtenerDatos={obtenerDatos}
                />
            </div>
            
            <div className="row justify-content-center">
                {error ? (<Error />) : null}
                {mensajeDatos}
            </div>
            <ListaImagenes 
                    imagenes = {imagenes}
                />
            <div className="row justify-content-center">
                {cargarSpinner}
                
                {(paginaActual === 1) ? null : (
                    <button className="btn btn-sm btn-primary mr-1"
                        onClick={paginaAnterior}
                    >&laquo; Anterior</button>
                )}
                {(paginaActual === totalPaginas) ? null : (
                    <button className="btn btn-sm btn-primary"
                        onClick={paginaSiguiente}
                    >Sigueinte &raquo; 
                    
                    </button>
                )}
            </div>
            <div className="row justify-content-center mt-2">
                {nuemeroPaginas}
            </div>



        </div>
     );
}
 
export default Inicio;