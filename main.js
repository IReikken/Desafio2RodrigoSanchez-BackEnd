
// se trae el módulo de fs.promises y se renombra como fs
import {promises as fs} from 'fs'

// Se define variable utilizada para el id autoincrementable
let idCounter = 1 

// Se define array que sirve para validar campos en el método addProduct

const campos  = ['title','description', 'price', 'thumbnail', 'code', 'stock']

class ProductManager{
    constructor(path) {
        this.products = []
        this.path = path
    }

    addproduct(product) {

        // Se define variable que se utilizara para validar que el objeto esté completo
        let match = 0
        // Se utiliza el método forEach para comparar los campos y validar que no falte alguno en el producto, evitando que se agregue si es así
        Object.keys(product).forEach(key => {
            for (let i = 0; i < campos.length; i++) {                
                if(campos[i] == key){
                    match++
                }
            }
        })

        // Condicional que evalua si el código del producto es reptido, si es repetido mostrará un mensaje en la consola y no agregará el producto
        if(match == campos.length){
            if(this.products.find ( element => element.code == product.code )) {
                console.log(`No se guardó producto porque el código "${product.code}" ya existente`)
            }
            else {
                product.id = idCounter++
                this.products.push (product)
        
                // const readtxt = async (product) => {
                //     const fileObject = JSON.parse(await fs.readfile(this.products.path, 'utf-8'))
                // }

                const writetxt = async (products) => {
                    await fs.writeFile(this.path, JSON.stringify(products))
                }

                writetxt(this.products)
            }
        }
        else{
            console.log(`No se agregó producto porque falta al menos una propiedad`)
        }
    }

    // Método para traer todos los productos de la clase

    getProducts(){
        return this.products
    }


    getProducById(id){
        
    //Se busca el id del producto con el método find y se guarda en productById

        let productById = this.products.find( element => element.id == id )

    //Condicional que detecta si el id del producto existe

        if (productById == undefined) {
            console.error("Not found")
        } 
        else {
            return productById 
        }

    }
}

// Se crean 3 objetos literales para probar la clase y los métodos

let item1 = {
    title: 'Bicicleta',
    description: 'Vehículo de dos ruedas movido por una persona, provisto de un manubrio en la parte delantera, un asiento para el conductor y dos pedales que transmiten el movimiento de las piernas a la rueda trasera mediante una cadena y un piñón',
    price: 500,
    thumbnail: 'https://www.definicionabc.com/wp-content/uploads/bicicleta.jpg',
    code: 659,
    stock: 10
}

let item2 = {
    title: 'Patineta',
    description: 'Vehículo compuesto por una tabla de madera con los extremos levantados, con cuatro ruedas y dos ejes, con la cual se practica el deporte del skateboarding',
    // price: 200,
    thumbnail: 'https://png.pngtree.com/png-clipart/20210627/original/pngtree-skateboarding-png-image_6465465.jpg',
    code: 394,
    stock: 20
}

let item3 = {
    title: 'Escúter',
    description: 'Vehículo que consiste en una plataforma alargada sobre dos ruedas en línea y una barra de dirección, con la que se deslizan los patinadores tras impulsarse con un pie contra el suelo.n',
    price: 350,
    thumbnail: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.collinsdictionary.com%2Fes%2Fdiccionario%2Fingles%2Fmicro-scooter&psig=AOvVaw0dFlqBHh5b8GTZWToCqDHQ&ust=1690579534529000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjlsdbpr4ADFQAAAAAdAAAAABAE',
    code: 659,
    stock: 15,
}

let item4 = {
    title: 'Patines',
    description: 'Aparato deportivo o de entretenimiento que consiste en una plataforma ajustable a la suela del calzado o una bota con esta plataforma adherida, montada sobre ruedas.',
    price: 120,
    thumbnail: 'https://www.inercia.com/media/wysiwyg/patines_velocidad.jpg',
    code: 284,
    stock: 50,
}



let TestedProducts = new ProductManager("./products.txt")

// Se agregan 4 items al productManager, el 1ro y 3ro tienen el mismo código y el 2do no tiene la propiedad price
    TestedProducts.addproduct(item1)
 //   TestedProducts.addproduct(item2)
 //   TestedProducts.addproduct(item3)
 //   TestedProducts.addproduct(item4)

// Se muestra en la consola el resultado de los métodos creados para la clase
 //   console.log(TestedProducts.getProducById(1))
 //  console.log(TestedProducts.getProducById(3))
 //   console.log(TestedProducts.getProducts())