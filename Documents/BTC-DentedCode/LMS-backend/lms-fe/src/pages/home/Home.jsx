import React, { useEffect, useState } from "react";
import { CustomCarousel } from "../../components/customCarouse/CustomCarousel";
import { Container, Row, Col, Form } from "react-bootstrap";
import { CustomCard } from "../../components/customCard/CustomCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setBooks } from "../../features/books/bookSlice";

const Home = () => {
  const { books } = useSelector((state) => state.bookInfo);

  // general store
  // const books = [
  //   {
  //     _id: 1,
  //     title: "Learning JS",
  //     author: "Author",
  //     thumbnail: "https://randomuser.me/api/portraits/men/59.jpg",
  //     publishedYear: 2000,
  //     status: "active",
  //   },
  // ];

  const [searchedBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    setSearchBooks(books.filter((book) => book.status == "active"));
  }, [books]);

  const handleOnSearch = (e) => {
    const { value } = e.target;

    setSearchBooks(
      books.filter(
        ({ status, title }) =>
          status == "active" &&
          title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <>
      <CustomCarousel />

      {/* book list  */}

      <Container>
        <Row>
          <Col className="d-flex justify-content-between mt-5">
            <label htmlFor="">{searchedBooks.length} books found!</label>
            <div>
              <Form.Control
                onChange={handleOnSearch}
                placeholder="search by book name .. "
              />
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="mb-4">
          <Col className="d-flex gap-4 flex-wrap justify-content-center">
            {searchedBooks.map((book) => (
              <Link key={book._id} to={"/book/" + book._id}>
                <CustomCard {...book} />
              </Link>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
