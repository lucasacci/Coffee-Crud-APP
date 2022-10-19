import { Form, Button } from "react-bootstrap";
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { crearProductoAPI } from "../../helpers/queries";

const CrearProducto = () => {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();

  const navegacion = useNavigate();

  const onSubmit = (datos) =>{
    console.log(datos)
    //enviar la peticion a la API
    crearProductoAPI(datos).then((respuesta)=>{
      console.log(respuesta)
      if(respuesta.status === 201){
        //si la respuesta es correcta indicarle al usuario
        Swal.fire("Producto creado","El producto fue creado exitosamente","success");

        reset();

        navegacion('/administrar')

        
      }else{
        Swal.fire("Ocurrio un error","El producto no pudo ser creado","error")
      }
    })
  }

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      {/* <Form onSubmit={handleSubmit}> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Nombre producto*</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Ej: Cafe"
          minLength={2}
          maxLength={50}
          {...register('nombreProducto', {
            required:'El nombre del producto es obligatorio',
            minLength:{
              value:2,
              message: 'La cantidad de caracteres es 2 como minimo'
            },
            maxLength:{
              value:50,
              message:'La cantidad maxima de caracteres es de 50'
            }
          })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control type="number" placeholder="Ej: 50" 
          {...register('precio',{
            	required:'El precio del producto es un dato obligatorio',
              min:{
                value:1,
                message: 'El precio minimo debe ser de $1'
              },
              max:{
                value:10000,
                message: 'El precio maximo debe ser de $10000'
              }
          })
          } />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register('imagen',{
              required: 'La url de la imagen es obligatoria',
              pattern: {
                value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                message: 'Debe ingresar una URL valida'
              }
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select {
            ...register('categoria',{
              required:'Debe seleccionar una categoria'
            })
          }>
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida caliente</option>
            <option value="bebida-fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default CrearProducto;
