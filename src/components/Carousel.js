import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { carouselProductsAction } from "../actions/CUD_PRODUCT";
import Loader from "../components/Spinner";
import { Link } from "react-router-dom";

const CarouselComp = () => {
  const { products, loading } = useSelector((state) => {
    return state.carousel;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carouselProductsAction());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Carousel pause='hover' className='bg-dark'>
          {products.map((p) => {
            return (
              <Carousel.Item key={p._id}>
                <Link to={"/product/" + p._id}>
                  <Image src={p.image} fluid></Image>
                  <Carousel.Caption className='carousel-caption'>
                    <h2>
                      {p.name} {p.price}
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default CarouselComp;
