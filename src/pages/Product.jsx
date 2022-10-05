import React, { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/products.css";
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState (0)

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));


  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const user = localStorage.getItem('user')

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  // console.log(product);

  const relatedPorducts = products.filter(
    (filtrateProduct) => filtrateProduct.category.id === product.category.id
  );

  const generateRelationSearch = () => {
    const forFirstLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(product.title.toLowerCase().substring(0, 4))
    );

    const forMiddleLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(
          product.title
            .toLowerCase()
            .substring(
              Math.floor(filtrateProduct.title.length / 2),
              Math.floor(filtrateProduct.title.length / 2) + 4
            )
        )
    );

    const forLastLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(
          product.title
            .toLowerCase()
            .substring(
              filtrateProduct.title.length - 5,
              product.title.length - 1
            )
        )
    );

    const generatedResults = [
      ...forFirstLetters,
      ...forMiddleLetters,
      ...forLastLetters,
    ];
    const result = generatedResults.filter(
      (item, index) => generatedResults.indexOf(item) === index
    );
    return result;
  };
  return (
    <Container>
      
      <section className="product-detail-container">

        <Carousel className="carrousel-container">
          {product?.productImgs.map((img) => (
            <Carousel.Item interval={3000} key={img}>
              <img
                className=" img-product-selected"
                src={img}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="description">
          <h1><strong>{product?.title}</strong></h1>
          <p>{product?.description}</p>
          <div className="flex">
            <div className="precio">
              <span className="price">Price</span>
              <br />
              <span className="amount"> <strong>${product?.price}</strong></span>
            </div>
            <div className="contador">
              <span className="quantity">Quantity</span>
              <br />
              <div className="div-contador">
                <button className="menos" onClick={() => {
                  if (!quantity < 1)
                  setQuantity(quantity - 1)}}>-</button>


              <input type="text" className="input" value={quantity} /> 
              <button className="mas" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              
            </div>
            


          </div>
          <div className="buttom-cart">

              <button className="buttom-add">Add to cart</button>
            </div>

            <button
              className="buttom-add"
              onClick={() => {
                if(user) alert('el usuario esta logeado actuo diferente')
                else addQuantityProducts(quantity);
              }}
            >
              Add to cart
            </button>
          </div>

     
      </section>
      <section>
        <h2>Articulos realcionados</h2>
        <Row>
          {relatedPorducts.map((prod) => (
            <Col>
              <Card
                onClick={() => navigate(`/product/${prod.id}`)}
                style={{ width: "18rem" }}
              >

                <Card.Img
                  variant="top"
                  className="img-product-selected"
                  src={prod?.productImgs}
                />
                <Card.Body>
                  <Card.Title>
                    {prod.title.length > 17
                      ? `${prod.title.substring(0, 17)}...`
                      : prod.title}
                  </Card.Title>
                  <Row>
                  <Col>
                    <span>Price</span>
                    <h3>${prod.price}</h3>
                  </Col>
                  <Col xs={6} md={3}>
                    <Button
                      onClick={() => {
                        dispatch(addProduct(producto));
                        
                      }}
                      className="add-cart-on-card"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </Col>
                </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Card>
        <Card.Body>
        <Card.Title>
                {prod.title.length > 17
                  ? `${prod.title.substring(0, 17)}...`
                  : prod.title}
              </Card.Title>
              <div className="price-cart">
                <div>
                  <span>Price</span>
                  <h3>${prod.price}</h3>
                </div>
                <Button
                  onClick={() => {
                    if(user) alert('el usuario esta logeado actuo diferente')
                    else dispatch(addProduct(prod));
                  }}
                  className="add-cart-on-card"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        

      </section>

      <section>
        <h2>Quizás te interese</h2>
        <Row>
          {generateRelationSearch().map((prod) => (
            <Col>
              <Card
                onClick={() => navigate(`/product/${prod.id}`)}
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  className="img-product-selected"
                  src={prod?.productImgs}
                />
                <Card.Body>
                  <Card.Title>
                    {prod.title.length > 17
                      ? `${prod.title.substring(0, 17)}...`
                      : prod.title}
                  </Card.Title>
                  <Row>
                  <Col>
                    <span>Price</span>
                    <h3>${prod.price}</h3>
                  </Col>
                  <Col xs={6} md={3}>
                    <Button
                      onClick={() => {
                        dispatch(addProduct(producto));
                        
                      }}
                      className="add-cart-on-card"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </Col>
                </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Product;
