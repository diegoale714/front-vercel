
import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";
import "./NewProduct.css";

function NewProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [talles, setTalles] = useState("");
    const [tela, setTela] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description ||!talles ||!tela || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, talles, tela, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dwbckhl3p",
                uploadPreset: "pujr0w8d",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Crear producto</h1>
                        {isSuccess && <Alert variant="success">Producto creado correctamente</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del producto</Form.Label>
                            <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion del producto</Form.Label>
                            <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion del talles</Form.Label>
                            <Form.Control as="textarea" placeholder="Tenemos talles desde S-XXL hasta 6 al 10" style={{ height: "100px" }} value={talles} required onChange={(e) => setTalles(e.target.value)} />
                        </Form.Group>

                        
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion del tela</Form.Label>
                            <Form.Control as="textarea" placeholder="Algodon peinado 24.1 premium" style={{ height: "100px" }} value={tela} required onChange={(e) => setTela(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio($)</Form.Label>
                            <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Seleccionar uno --
                                </option>
                                <option value="remeras">remeras</option>
                                <option value="buzos">buzos</option>
                                <option value="musculosas">musculosas</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Agregar Imagenes
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Crear Producto
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>
        </Container>
    );
}

export default NewProduct;
