import "../style/pages/Detail.scss";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import axios from "axios";

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [countSize, setCountSize] = useState(1);
  const [countAmount, setCountAmount] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productList, setProductList] = useState([]);

  // color
  const [color, setColor] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const changeColor = (color) => {
    setSelectedColor(color);
  };
  // console.log(selectedColor);

  //size
  const [size, setSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  console.log(size);
  const changeSize = (size) => {
    setSelectedSize(size);
  };

  //address
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const changeAddress = (address) => {
    setSelectedAddress(address);
  };
  console.log(selectedAddress);

  useEffect(() => {
    const currentId = location.pathname.split("/")[2];
    setLoading(true);
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/${currentId}`)
      .then((result) => {
        setLoading(false);
        setCurrentProduct(result?.data?.data[0]);
        setColor(result?.data?.data[0].product_color.split(", "));
        setSize(result?.data?.data[0].product_size.split(", "));
        setIsActive(0);
        setImageId(currentProduct?.path[0]?.photo_path);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/product?category=${currentProduct?.product_category}`
          )
          .then((response) => {
            const relatedProductData = response?.data?.data;
            setProductList(relatedProductData);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  const changeImage = (index, img) => {
    setIsActive(index);
    setImageId(img);
  };

  const incrementSize = () => {
    setCountSize(countSize + 1);
  };

  const decrementSize = () => {
    setCountSize(countSize - 1);
    if (countSize < 2) {
      setCountSize(1);
    }
  };

  const incrementAmount = () => {
    setCountAmount(countAmount + 1);
  };

  const decrementAmount = () => {
    setCountAmount(countAmount - 1);
    if (countSize < 2) {
      setCountAmount(1);
    }
  };

  // Function to handle buy now button
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: currentProduct,
        product_size: selectedSize,
        product_color: selectedColor,
        total_product: countAmount,
      },
    });
  };

  // Function to change price to rupiah format
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };
  const [address, setAddress] = useState([]);
  const handleGetAddress = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}address`)
      .then((result) => {
        console.log(result.data?.data);
        setAddress(result?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="DetailProduct">
      <Navbar />

      <section id="identification" className="container">
        <div className="row">
          <div className="col-4">
            <div className="d-flex mb-3 justify-content-center">
              {
                !loading ? (
                  <img
                    className="img-product-big"
                    //tenary opertator to check if imageid is available
                    src={imageId ? imageId : currentProduct?.path[0]?.photo_path}
                    alt="Image Product"
                  />
                ) : (
                  <Skeleton width={'300'} height={'300'} />
                )
              }
            </div>
            <div className="d-flex mt-3 justify-content-center overflow-hidden">
              <div className="col-auto">
                {
                  !loading ?
                    (
                      <img
                        className={`img-product-small ${isActive === 0 ? "active" : ""
                          }`}
                        src={currentProduct?.path[0]?.photo_path}
                        alt="Image Product"
                        onClick={(e) =>
                          changeImage(0, currentProduct?.path[0]?.photo_path)
                        }
                      />
                    ) : (
                      <Skeleton width={'50'} height={'50'} />
                    )
                }
              </div>
              <div className="col-auto">
                {
                  !loading ?
                    (
                      <img
                        className={`img-product-small ${isActive === 1 ? "active" : ""
                          }`}
                        src={currentProduct?.path[1]?.photo_path}
                        alt="Image Product"
                        onClick={(e) =>
                          changeImage(0, currentProduct?.path[1]?.photo_path)
                        }
                      />
                    ) : (
                      <Skeleton width={'50'} height={'50'} />
                    )
                }
              </div>
              <div className="col-auto">
                <img
                  className={`img-product-small ${isActive === 2 ? "active" : ""
                    }`}
                  src={currentProduct?.path[2]?.photo_path}
                  alt="Image Product"
                  onClick={(e) =>
                    changeImage(2, currentProduct?.path[2]?.photo_path)
                  }
                />
              </div>
              <div className="col-auto">
                <img
                  className={`img-product-small ${isActive === 3 ? "active" : ""
                    }`}
                  src={currentProduct?.path[3]?.photo_path}
                  alt="Image Product"
                  onClick={(e) =>
                    changeImage(3, currentProduct?.path[3]?.photo_path)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="row ms-2">
              <h2 className="fw-bold">{currentProduct?.product_name || <Skeleton width={'300'}/> }</h2>
              <h6 className="text text-muted">Code Crafters</h6>
              <div className="row my-2">
                <div className="ic-rating col-auto pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="rating col-auto ps-0">
                  <small className="text">(4.8)</small>
                </div>
              </div>
              <h6 className="text fw-light text-muted mt-3">Price</h6>
              <h1 className="fw-bolder">
                {formatPrice(currentProduct?.product_price) || <Skeleton width={'300'} />}
              </h1>
              <h6 className="text fw-bold mt-5">Color</h6>
              <div className="row">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedColor ? selectedColor : "Select Color"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Array.isArray(color) && color.length > 0 ? (
                      color.map((color, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => changeColor(color)}
                        >
                          {color}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>No product color available</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="row mt-4">
                <div className="col-md-3">
                  <h6 className="text fw-bold">Size</h6>
                  <div className="row d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedSize ? selectedSize : "Select Size"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {Array.isArray(size) && size.length > 0 ? (
                          size.map((size, index) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => changeSize(size)}
                            >
                              {size}
                            </Dropdown.Item>
                          ))
                        ) : (
                          <Dropdown.Item>
                            No product size available
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    {/* <div className="col-auto">
                      <button
                        id="btn-inc-dec"
                        type="button"
                        className="btn btn-primary border-2 rounded-circle"
                        onClick={decrementSize}
                        disabled={countSize === 1 ? true : false}
                      >
                        <FontAwesomeIcon
                          className="ic"
                          icon="minus"
                          size="sm"
                        />
                      </button>
                    </div> */}
                    {/* <div className="col-auto d-flex justify-content-center align-items-center">
                      <h5 className="lh-1 text-center">{countSize}</h5>
                    </div>
                    <div className="col-auto">
                      <button
                        id="btn-inc-dec"
                        type="button"
                        className="btn btn-primary border-2 rounded-circle"
                        onClick={incrementSize}
                      >
                        <FontAwesomeIcon className="ic" icon="plus" size="sm" />
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="col-md-3">
                  <h6 className="text fw-bold">Amount</h6>
                  <div className="row d-flex align-items-center">
                    <div className="col-auto">
                      <button
                        id="btn-inc-dec"
                        type="button"
                        className="btn btn-primary border-2 rounded-circle"
                        onClick={decrementAmount}
                        disabled={countAmount === 1 ? true : false}
                      >
                        <FontAwesomeIcon
                          className="ic"
                          icon="minus"
                          size="sm"
                        />
                      </button>
                    </div>
                    <div className="col-auto d-flex justify-content-center align-items-center">
                      <h5 className="lh-1 text-center">{countAmount}</h5>
                    </div>
                    <div className="col-auto">
                      <button
                        id="btn-inc-dec"
                        type="button"
                        className="btn btn-primary border-2 rounded-circle"
                        onClick={incrementAmount}
                      >
                        <FontAwesomeIcon className="ic" icon="plus" size="sm" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row align-items-center d-flex mt-5">
                {/* <div className="col-md-3">
                  <button
                    id="btn-chat"
                    type="button"
                    className="btn btn-light border-2 border rounded-pill"
                  >
                    Chat
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    id="btn-cart"
                    type="button"
                    className="btn btn-light border-2 border rounded-pill"
                  >
                    Add Cart
                  </button>
                </div> */}
                <div className="col-md-6">
                  <button
                    id="btn-buy"
                    type="button"
                    className="btn btn-primary border-2 rounded-pill"
                    onClick={handleBuyNow}
                    // onClick={() => {
                    //   handleShow();
                    //   handleGetAddress();
                    // }}
                    disabled={selectedColor && selectedSize ? false : true}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="information" className="container">
        <div className="row">
          <h2 className="fw-bold">Product Information</h2>
        </div>
        <div id="condition" className="row mt-5">
          <h4>Condition</h4>
          <h4 style={{ color: "#DB3022" }}>
            {currentProduct?.product_condition || <Skeleton width={'300'} />}
          </h4>
        </div>
        <div id="description" className="row mt-5">
          <h4>Description</h4>
          <p className="text text-muted">
            {currentProduct?.product_description || <Skeleton width={'300'} />}
          </p>
        </div>
        <div id="product-review" className="row mt-5">
          <h4>Product Review</h4>
          <div className="row">
            <div className="col-md-1 d-flex align-items-center me-5">
              <div className="row gx-0">
                <h1>
                  4.8
                  <span
                    className="text text-muted"
                    style={{ fontSize: "1.25rem" }}
                  >
                    /5
                  </span>
                </h1>
                <div className="ic-rating">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row align-items-center">
                <div className="col-auto ps-0 pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;5</small>
                </div>
                <div className="col-md-3">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Danger example"
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "7px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;90</small>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-auto ps-0 pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;4</small>
                </div>
                <div className="col-md-3">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Danger example"
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "7px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;50</small>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-auto ps-0 pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;3</small>
                </div>
                <div className="col-md-3">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Danger example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "7px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;0</small>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-auto ps-0 pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;2</small>
                </div>
                <div className="col-md-3">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Danger example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "7px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;0</small>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-auto ps-0 pe-0">
                  <FontAwesomeIcon
                    id="ic-star"
                    className="ic"
                    icon="star"
                    size="sm"
                  />
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;1</small>
                </div>
                <div className="col-md-3">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Danger example"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "7px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="col-auto ps-0 pe-0">
                  <small>&nbsp;0</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        <hr className="solid" style={{ borderTop: "2px solid" }} />
      </div>

      <section id="same-category">
        <div className="container mt-4">
          <div className="row">
            <h2 className="fw-bold lh-1">You can also like this</h2>
            <p className="text-muted lh-1">You’ve never seen it before!</p>
          </div>
          <div className="row row-cols-md-5 rows-cols-xs-2">
            {productList?.length > 0 ? (
              productList.map((product) => (
                <div className="col">
                  <ProductCard
                    productId={product?.product_id}
                    image={product?.path[0].photo_path}
                    title={product?.product_name}
                    price={product?.product_price}
                    storeName={"Code Crafters"}
                    rating={"4.8"}
                  />
                </div>
              ))
            ) : (
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 mt-5">
                <p className="text-center">No products found</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Choose Address</Accordion.Header>
              <Accordion.Body>
                {address?.length > 0 ? (
                  address.map((item, index) => (
                    <div className="container" key={index}>
                      <div className="form-check flex-column mb-3">
                        <div className="row">
                          <div className="col-1">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value={item.address_id}
                              onChange={(e) => {
                                changeAddress(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-10">
                            <h6 className="text fw-bold mb-0">
                              {item?.recipient_name} ({item?.address_name})
                            </h6>
                            <p className="text fw-bold mb-0">
                              {item?.recipient_phone_number}
                            </p>
                            <p
                              className="text mb-0"
                              style={{
                                width: "100%",
                                overflowWrap: "break-word",
                              }}
                            >
                              {item?.address_data}
                            </p>
                            <p className="text mb-0">
                              {item?.city} {item?.postal_code}
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr
                        style={{ border: "none", borderTop: "3px solid black" }}
                      />
                    </div>
                  ))
                ) : (
                  <p>There are no addresses.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Add Address</Accordion.Header>
              <Accordion.Body>
                <form onSubmit={handleSubmitAddress}>
                  <label for="allAddress" className="form-label">
                    Save address as (ex : home address, office address)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="allAddress"
                    placeholder="Rumah"
                    ref={address_name}
                  />
                  <label for="name" className="form-label">
                    Recipient’s name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient_name"
                    ref={recipient_name}
                  />
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    ref={address_data}
                  />
                  <label for="telphone_number" className="form-label">
                    Recipient's telephone number
                  </label>
                  <input
                    type="number"
                    className="form-control mb-2"
                    id="telphone_number"
                    ref={recipient_phone_number}
                  />
                  <label for="postal_code" className="form-label">
                    Postal code{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="postal_code"
                    ref={postal_code}
                  />
                  <label for="city" className="form-label">
                    City or Subdistrict{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="city"
                    ref={city}
                  />
                  <button type="submit" class="btn btn-success">
                    Add Address
                  </button>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleBuyNow}
            disabled={selectedAddress ? false : true}
          >
            Order Now
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default Detail;
