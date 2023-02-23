import './App.css';
import {useEffect, useState} from "react";
import {useFetch} from "./hooks/useFetch";

const url = "http://localhost:3000/products"

function App() {

    const [products, setProducts] = useState([])

    const {data: items, httpConfig, loading, error} = useFetch(url)

    const [name, setName] = useState("");
    const [price, setPrice] = useState();

    // useEffect(async () => {
    //
    //     const resp = await fetch(url)
    //     const data = await resp.json()
    //
    //     setProducts(data)
    // })

    // useEffect(() => {
    //     async function fetchData() {
    //         const resp = await fetch(url)
    //         const data = await resp.json()
    //
    //         setProducts(data)
    //     }
    //     fetchData()
    // }, [])
    console.log(products)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const product = {
            name,
            price
        }

        console.log(product)

        // const resp = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify(product)
        // })
        //
        // const addedProduct = await resp.json()
        //
        // setProducts((prevProducts) => [...prevProducts, addedProduct])

        httpConfig(product, "POST")


        setName("")
        setPrice("")
    }

    return (
        <div className="App">
            <h1>Lista de Produtos</h1>
            {loading && (<p>Carregando dados...</p>)}
            {error && (<p>{error}</p>)}
            { !loading && !error &&
                <ul>
                    {
                        items && items.map(
                            (product) => (
                                <li key={product.id}>
                                    {product.name} - R${product.price}
                                </li>
                            )
                        )
                    }
                </ul>
            }

            <div className="add-product">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={name} name="name"
                               onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label>
                        Preço:
                        <input type="number" value={price} name="price"
                               onChange={(e) => setPrice(e.target.value)}/>
                    </label>
                    {loading?
                        (<input type="submit" value="Criar" disabled/>)
                        :(<input type="submit" value="Criar" />)
                    }

                </form>
            </div>

        </div>
    );
}

export default App;
