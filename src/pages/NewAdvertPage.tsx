import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "../api";
import Message from "../components/message"
import { getTags } from "../api";
import TagSelector from "../components/TagSelector";

const NewAdvertPage = () =>{
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sale, setSale] = useState("true")
    const [tags, setTags] = useState<string[]>([]);
    const [photo, setPhoto] = useState<File | null >(null); 
    const [message, setMessage] = useState<{type: "success" | "error" | "info";text:string} | null>(null);
    const navigate = useNavigate()
    const [isloading, setIsLoading ] = useState(false)
    const tagList = getTags ()

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        if (Number(price)<= 0) {
            setMessage({ type:"error", text:"El precio debe ser positivo"});
            return;
        };

        if (tags.length === 0) {
            setMessage({ type:"error", text: "Debe seleccionar al menos un tag"})
        }

        setIsLoading(true)

        try{
            const advertData = {
                name,
                price: parseFloat(price),
                sale: sale === "true",
                tags,
                photo: photo || undefined,
            };

            const response = await createAdvert(advertData);

            if(!response.id){
                setMessage({ type: "error", text:"Error. Nos e pudo obtener el ID del anuncio"});
                setIsLoading(false);
                return;
            }

            setMessage({ type: "success", text:"Anuncio creado con éxito. Redirigiendo ..."})
            navigate(`/adverts/${response.id}`)
        } catch (error) {
            setMessage({ type:"error", text: "Error al crear el anuncio.Intenta nuevamente."})
        } finally{
            setIsLoading(false)
        }
    };

    const handleTagChange = (tag: string) =>{
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag): [...prevTags, tag]
            )
    }
    
    return (
        <div className="container py-5">
            <h2>Crear anuncio</h2>
            {message && <Message type={message.type} text={message.text} />}
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Producto</label>
                    <input 
                    type="text" 
                    id="name"
                    className="form-control" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input 
                    type="number"
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <div>
                        <label>
                            <input type="radio" 
                            value="true"
                            checked={sale === "true"}
                            onChange={(e) =>setSale(e.target.value)}
                            /> {" "}
                            Venta
                        </label>
                        <label className="form-label">
                            <input type="radio" 
                            value="false"
                            checked={sale === "false"}
                            onChange={(e) => setSale(e.target.value)}
                            />{" "}
                            Compra
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <TagSelector selectedTags={tags} onChange={setTags}/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Foto</label>
                    <input type="file" 
                    id="photo"
                    className="form-control"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isloading}>
                    {isloading ? "Enviando..." : "Crear Anuncio"}
                </button>
            </form>
            
        </div>
    )
}

export default NewAdvertPage;