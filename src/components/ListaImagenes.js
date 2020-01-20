import React from 'react';
import Imagen from './Imagen';

const ListaImagenes = ({imagenes}) => {
    return ( 
        <div className="row">
            {imagenes.map(imagen => (
                <Imagen 
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
     );
}
 
export default ListaImagenes;