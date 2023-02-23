import {useEffect, useState} from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)

    const [callFetch, setCallFetch] = useState(false)

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const httpConfig = (data, method) => {
        if (method === "POST"){
            setConfig({
                method,
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try{
                const resp = await fetch(url)
                const json = await resp.json()

                setData(json)
            }catch (e){
                console.log(e.message)
                setError("Ocorreu um erro inexperado ao buscar os dados!")
            }

            setLoading(false)
        }
        fetchData()
    }, [url, callFetch])

    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                setLoading(true)

                let fetchOptions = [url, config]
                const resp = await fetch(...fetchOptions)
                const json = await resp.json()

                setCallFetch(json)
            }
        }
        httpRequest()
    }, [config, method, url]);


    return {data, httpConfig, loading, error}

}
