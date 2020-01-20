import React from 'react';

const Formulario = ({obtenerDatos}) => {
    return ( 
        <form onSubmit={obtenerDatos} className="mt-4">
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen ejemplo: cafe"
                        type="text"
                        name="imagen"
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        className="btn btn-lg btn-block btn-danger"
                        type="submit"
                        value="Buscar"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;