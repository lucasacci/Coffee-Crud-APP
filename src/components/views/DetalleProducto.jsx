import { useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { obtenerProductoAPI } from '../helpers/queries';

const DetalleProducto = () => {
    
    const [datos, setDatos] = useState({
        imagen: null,
        title: null,
        categoria: null,
        precio: null
    })
    const {id} = useParams();
  
    useEffect(()=>{
      obtenerProductoAPI(id).then((respuesta)=>{
        if(respuesta.status === 200){

          setDatos({
            imagen: respuesta.dato.imagen,
            title: respuesta.dato.nombreProducto,
            categoria: respuesta.dato.categoria,
            precio: respuesta.dato.precio
          })
        }
      })
    },[])
    

   

    return (
        <Card className='container my-5 mainSection'>
            <Row className='w-75'>
                <Col md={6}>
                    <img src={datos.imagen} alt='brownie' className="w-100" />
                </Col>
                <Col md={6} className="py-3">
                <h3>{datos.title}</h3>
                <hr/>
                <Badge bg="success">{datos.categoria}</Badge>
                <p className='mt-3'><b>Precio: ${datos.precio}</b></p>
                </Col>
            </Row>
        </Card>
    );
};

export default DetalleProducto;