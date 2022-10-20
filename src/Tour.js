import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Card, CardImg, Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "./constants";

export const Tour = () => {
  const [fetchData, setFetchData] = useState();
  const [loading, setLoading] = useState(false);

  const handleRemoveTour = (id) => {
    const newtour = fetchData.filter((tour) => {
      return tour.id !== id;
    });
    setFetchData(newtour);
  };

  const handleChangeReadMore = (id) => {
    const newRead = fetchData.map((obj) => {
      if (obj.id === id) {
        return { ...obj, readMore: !obj.readMore };
      }
      return obj;
    });
    setFetchData(newRead);
  };
  const fetchedData = () => {
    setLoading(true);
    axios
      .get(BASE_URL)
      .then((res) => {
        const newres = res.data.map((obj) => ({ ...obj, readMore: false }));
        console.log(res);
        setFetchData(newres);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchedData();
  }, []);
  return (
    <>
      {!fetchData && (
        <div className="justify-content-between text-center m-5 ">
          <Button variant="dark">
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      )}
      {fetchData?.length === 0 && (
        <div className="justify-content-center text-center m-auto">
          <h2>No Tours Left</h2>
          <button
            className="btn btn-info fw-bold text-white m-3"
            onClick={() => fetchedData()}
          >
            {" "}
            Refresh
          </button>
        </div>
      )}
      <Container style={{overflowX: 'hidden'}}>
        {fetchData?.length > 0 && (
          <div className="d-flex align-items-center flex-column" >
            <h3 className="justify-content-center text-center fw-bold p-2">
              Our Tours
            </h3>
            <div
              style={{ height: "3px", width:'8%' }}
              className="bg-primary"
            ></div>
          </div >
        )}
        <Row className="p-md-3">
          <Col className="d-flex align-items-center flex-column">
            {fetchData?.map((data) => (
              <Col className='card'
                style={{
                  margin: "10px 10px",
                  minHeight: "600px",
                }}
                lg='6'
                md='12'
              >
                <CardImg
                  variant="top"
                  src={data.image}
                  style={{ height: "300px" }}
                  className="w-100"
                />
                <Card.Body className="p-2 p-md-4">
                  <Card.Title className="d-flex justify-content-between">
                    <h4 className="fw-bold col-9 col-md-10">{data.name}</h4>
                    <h4 className="text-primary fw-bold col-3 col-md-2">
                      &#8377; {data.price}
                    </h4>
                  </Card.Title>

                  <Card.Text className="pb-2">
                    {data.readMore
                      ? data.info
                      : `${data.info.substring(0, 200)}...`}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleChangeReadMore(data.id)}
                  >
                    {data.readMore ? "Show Less" : "Read More"}
                  </Button>
                  <div className="justify-content-between text-center pt-2 mt-2">
                    <Button
                      className="btn btn-danger btn-lg col-10 col-md-6 fw-bold "
                      onClick={() => handleRemoveTour(data.id)}
                    >
                      Not Interested
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};
