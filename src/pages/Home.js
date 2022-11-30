import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Carrusel from "../components/Carrusel";
import { countries } from "../components/Data";

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <div>
           
            <div className="App">
                
                {/* Carousel */}
            <Carrusel images={countries} />
            </div>
            <div className="featured-products-container container mt-5">
                <h2>Ultimos productos</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        Ver mas {">>"}
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            <div className="sale__banner--container mt-4 justify-content-center">
                <img src="https://i.pinimg.com/564x/6f/36/d2/6f36d2b576c8eeca9422c725af810b84.jpg" />
                <img src="https://i.pinimg.com/564x/80/7c/83/807c83e5d19282df55786bd21b158add.jpg" />
                <img src="https://i.pinimg.com/564x/a3/2d/fc/a32dfc400f283965de0bdb10e2b4c545.jpg" />
            </div>
            <div className="recent-products-container container mt-4">
                <h2>Categorias</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;