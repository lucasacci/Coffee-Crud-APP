import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { consultarAPI } from "../../helpers/queries";

const CardProducto = () => {

  const [productos, setProductos] = useState([]);


  useEffect(() => {
    consultarAPI().then(
      (respuesta) => {
        //la respuesta es exitosa
        setProductos(respuesta);
      },
      (reason) => {
        console.log(reason);
        //mostrar un mensaje al usuario
        Swal.fire(
          'Ocurrio un error',
          'Intentelo nuevamente en unos minutos',
          'error'
        )
      }
    );
  }, []);

  return (

   <>
      {
        productos.map((el,i)=>{
          return(

      
            <Card className="my-4 mx-4" key={i}>
              <Card.Img
                variant="top"
                src={el.imagen}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title>{el.nombreProducto}</Card.Title>
                <Card.Text>Categoria: ${el.categoria}</Card.Text>
                <Card.Text>Precio: ${el.precio}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/detalle-producto/${el.id}`} className="btn btn-danger me-2">Ver más</Link>
              </Card.Footer>
            </Card>
          )
      })
      }
   </>
    
  );
};

export default CardProducto;
