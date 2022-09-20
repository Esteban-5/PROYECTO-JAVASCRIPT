AOS.init ();

// DEFINIMOS PRODUCTO
class producto{
    constructor (nombre,precio, fuente){
    this.nombre = nombre;
    this.precio= parseFloat(precio);
    this.fuente = fuente;
   

}
}

class itemsDelCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const productos = []; 

let miCarrito = [];

//sintaxis optimizada//
miCarrito = JSON.parse(localStorage.getItem('miCarrito')) || []  // micarrito podemos retomarlo o hacer uno nuevo




const contenedorProductos = document.getElementById('contenedor-productos'); 

const contenedorCarritoCompras = document.querySelector("#items"); 

const contenedorFooterCarrito = document.querySelector("#footer"); 

cargarProductos();  
dibujarCatalogoProductos(); 
dibujarCarrito();




    function cargarProductos() {
        productos.push(new producto('REMERA VANS', 150,'./imagenes/remeraVans.jpg'));
        productos.push(new producto('MEDIAS CONVERSE', 50,'./imagenes/medias.jpg'));
        productos.push(new producto('SHORTS ADIDAS', 90,'./imagenes/shortAdidas.jpg'));
        productos.push(new producto('ZAPATILLAS VANS OLD SKULL', 180,'./imagenes/vans.jpg'));
        productos.push(new producto('CAMPERA JORDAN', 250,'./imagenes/camperaJordan.jpg'));
        productos.push(new producto('ZAPATILLAS ADIDAS FORUM MID', 230,'./imagenes/adidasForumMid.jpg'));
       
    }


    function dibujarCarrito() {

        let precioFinal = 0;
        contenedorCarritoCompras.innerHTML = '';
    
        miCarrito.forEach(
            (elemento) => {
                let renglonesCarrito= document.createElement("tr");
                
                renglonesCarrito.innerHTML = `
                    <td>${elemento.producto.nombre}</td>
                    <td><input id="cantidad-producto-${elemento.producto.nombre}" type="number" value="${elemento.cantidad}" min="1" max="50" step="1" style="width: 50px;"/></td>
                    <td>$ ${elemento.producto.precio}</td>
                    <td>$ ${elemento.producto.precio*elemento.cantidad}</td>
                `;
    
                contenedorCarritoCompras.append(renglonesCarrito);

                
                //sintaxis optimizada//
                precioFinal+=elemento.cantidad*elemento.producto.precio;
    
                //agregamos evento a carrito
                let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.nombre}`);
                
                cantidadProductos.addEventListener("change", (e) => {
                    let nuevaCantidad = e.target.value;
                    elemento.cantidad = nuevaCantidad;
                    dibujarCarrito();
                });
    
            }
        );
        
        //sintaxis optimizada//
        miCarrito.length === 0 ? contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`:
            contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Total de la compra: $${precioFinal}</th>`;
        
    
    }   

    function crearCard(producto) {
        //Botón
        let botonAgregar = document.createElement("button");
        botonAgregar.className = "btn btn-success";
        botonAgregar.innerText = "Agregar";
    
        //Card body
        let cuerpoCarta = document.createElement("div");
        cuerpoCarta.className = "card-body";
        cuerpoCarta.innerHTML = `
            <h5>${producto.nombre}</h5>
            <p>$ ${producto.precio} USD</p>
        `;
        cuerpoCarta.append(botonAgregar);
    
        //Imagen
        let imagen = document.createElement("img");
        imagen.src = producto.fuente;
        imagen.className = "card-img-top";
        imagen.style= "height: 480px"
        imagen.alt = producto.nombre;
    
        //Card
        let carta = document.createElement("div");
        carta.className = "card m-2 p-2";
        carta.style = "width: 18rem ";

        
        //INYECTO AL DOM    
        carta.append(imagen); // cargamos primero la imagen
        carta.append(cuerpoCarta); // luego el cuerpo con el nombre,precio,descripcion
        //FUNCION ON.CLICK
        botonAgregar.onclick = () => {
            //alert("Hiciste click en el producto" + producto.nombre);
    
            let itemaComprar= new itemsDelCarrito(producto, 1);
            miCarrito.push(itemaComprar);
            localStorage.setItem("miCarrito",JSON.stringify(miCarrito));
    
            dibujarCarrito();
    
            swal({
                title: "¡Producto agregado!",
                text: `${producto.nombre} agregado al carrito de compra.`,
                icon: "success",
                buttons: {
                    cerrar: {
                        text: "Continuar comprando",
                        value: false
                    },
                    carrito: {
                        text: "Ir a carrito",
                        value: true
                    }
                }
            }).then((irACarrito) => {
    
                if(irACarrito) {
                   
                    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                    const modalToggle = document.getElementById('toggleMyModal');
                    myModal.show(modalToggle);
    
                }
            });
    
        } 
        
        return carta;
    
    }

    function dibujarCatalogoProductos() {
        contenedorProductos.innerHTML = "";
    
        productos.forEach(
            (producto) => {
                let carta = crearCard(producto);
                contenedorProductos.append(carta);
            }
        );
    
    }
   
    let botonVaciarCompra = document.getElementById("Finish");

    botonVaciarCompra.addEventListener("click", (i) => {
        i.preventDefault();

        swal({
            title: "Estas Seguro!",
            text: "No podra revertir los cambios",
            icon: "warning",
            buttons: {
                cerrar: {
                    text: "Cancelar",
                    value: false
                },
                confirmar: {
                    text: "Confirmar",
                    value: true
                }
            }
        }).then((result) => {
            if (result == true) {
                
                swal({
                title: "Gracias por comprar!",
                text:"Su pedido ya esta en camino!",
                icon: "success",}
                )
                localStorage.removeItem("miCarrito",JSON.stringify(miCarrito));
                contenedorCarritoCompras.innerHTML = '';
                contenedorFooterCarrito.innerHTML ='<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>';
                precioFinal=0;
            }
            
            })

      
    
    })