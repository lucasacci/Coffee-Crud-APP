
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { borrarProductoAPI, consultarAPI } from "../../helpers/queries";
// opcion 2
// const ItemProducto = ({id, nombreProducto, categoria, imagen, precio}) => {
// opcion 3
const ItemProducto = ({producto, setProductos}) => {
const {id, nombreProducto, categoria, imagen, precio} = {...producto} 



  const borrarProducto = () =>{
    borrarProductoAPI(id).then((respuesta)=>{
        if(respuesta.status === 200){

          //agregar ventana de sweet alert  si queremos borrar el producto, ventana de confirmacion 

          Swal.fire("Producto creado","El producto fue eliminado exitosamente","success");

          //obtener productos actuales y actualizar el state productos
          consultarAPI().then((respuesta)=>{
              setProductos(respuesta);
          })

        }else{
          Swal.fire("Ocurrio un error","Vuelva a intentarlo en un momento","error");
        }
    })
  }

  return (
    <tr>
      <td>{id}</td>
      {/* <td>{props.producto.nombreProducto}</td> */}
      {/* <td>{producto.nombreProducto}</td> */}
      <td>{nombreProducto}</td>
      <td>${precio}</td>
      <td>{imagen}</td>
      <td>{categoria}</td>
      <td>
        <Link className="btn-warning btn" to={`/administrar/editar/${id}`}>
          Editar
        </Link>
        <Button variant="danger" onClick={borrarProducto}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
