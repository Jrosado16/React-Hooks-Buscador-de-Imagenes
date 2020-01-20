import React from 'react';

const Imagen = ({imagen}) => {
    return ( 
        <div className="col-md-4 col-xs-6 col-sm-6 col-lg-2 mb-3">
            <div className="card bg-dark text-white">
                <img className="card-img-top" src={imagen.largeImageURL} alt={imagen.tags}/>
                <div className="card-body">
                    <p>{imagen.likes} Me gusta</p>
                    <p>{imagen.views} Vistas</p>
                    <a href={imagen.largeImageURL} target="_blank" rel="noopener noreferrer" className="btn btn-danger btn-sm">Ver Imagen</a>
                </div>
            </div>
        </div>
     );
}
 
export default Imagen;