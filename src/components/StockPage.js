import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col, InputGroup, Button, Form, Card } from 'react-bootstrap';
import { executeOrder, getStocks, validateOrder } from '../api';


const StockPage = (props) => {
    const { id, userName, balance } = props;
    const [stocks, setStocks] = useState([]);
    const [order, setOrder] = useState(0);
    const [isValidate, setIsValidate] = useState(false);
    const [message, setMessage] = useState("");
    const [textColor, setTextColor] = useState("green");

    useEffect(() => {
        getStocks().then((response) => {
            setStocks(response.data);
        });
    }, []);


    function handleBuyClick() {
        if (!isValidate) {
            const validateOrderRequest = JSON.stringify({
                balance: balance,
                order: order,
                stockId: stocks.id
            });
            validateOrder(validateOrderRequest).then((response) => {
                if (response.data == true) {
                    setIsValidate(true)
                    setTextColor("green")
                    setMessage("Order is Validated");
                }
                else {
                    setTextColor("red")
                    setMessage("Order is not Validated");
                }
            });

        }
        else {
            const orders = JSON.stringify({
                orderAmount: order
            });
            executeOrder(orders).then((response) => {
                if (response.data == true) {
                    setTextColor("green")
                    setMessage("Order executed successfully");
                    setIsValidate(false)
                    props.setRecall(!props.recall)
                }
                else {
                    setTextColor("red")
                    setMessage("Something went wrong");
                    setIsValidate(false)
                }
            });
        }
    }

    function handleOnChange(e) {
        e.preventDefault();
        setOrder(Number(e.target.value) * stocks.price);
    }

    return (
        <>
            {stocks.length == 0 ? (
                <div>Loading</div>
            ) : (
                <Row>
                    <Col style={{ textAlign: "-webkit-center" }}>
                        <Card style={{ width: '30rem' }}>
                            <Card.Img variant="top" src="https://styles.redditmedia.com/t5_3lo9l9/styles/communityIcon_p61qlexxb9581.png" />
                            <Card.Body>
                                <Card.Title>{stocks.stockName}</Card.Title>
                                <Card.Text>
                                    {"$" + stocks.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{ padding: "2rem" }}>
                        <h4 style={{ float: "left" }}> Please enter the number of stocks that you want to buy</h4>
                        <hr style={{ width: "inherit" }}></hr>
                        <InputGroup onChange={handleOnChange} className="mb-3">
                            <Form.Control
                                placeholder="Number of Stocks"
                                type="number"
                                aria-describedby="basic-addon1"
                            />
                            <Button onClick={handleBuyClick} variant="outline-secondary" id="button-addon1">
                                {!isValidate ? "Validate" : "Buy"}
                            </Button>

                        </InputGroup>
                        <Form.Label style={{ float: "left", fontWeight: "Bold" }}>Total Amount : {order} </Form.Label>
                        <Form.Label style={{ float: "right", fontWeight: "Bold", color: textColor }}>{message} </Form.Label>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default StockPage;