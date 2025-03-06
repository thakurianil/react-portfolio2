import React from "react";
import { DefaultLayout } from "../../components/layout/DefaultLayout";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Nav, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { ReviewBlock } from "../../components/customCard/ReviewBlock";
import { Stars } from "../../components/stars/Stars";
import { borrowBookAction } from "../../features/borrow/borrowAction";
// import { addNewBorrowAction } from "../../features/borrows/borrowAction";

const BookLanding = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { books } = useSelector((state) => state.bookInfo);
  const { user } = useSelector((state) => state.userInfo);
  const { pubReviews } = useSelector((state) => state.reviewInfo);

  const book = books.find((item) => item._id === _id);
  if (!book?._id) {
    return <Spinner animation="border" variant="primary" />;
  }

  const {
    title,
    author,
    publishedYear,
    thumbnail,
    description,
    isAvailable,
    expectedAvailable,
  } = book;

  const handleOnBookBorrow = () => {
    if (window.confirm("Are you sure, you want to borrow this book?")) {
      console.log("BoRROWING");
      dispatch(
        borrowBookAction({
          bookId: _id,
          bookTitle: title,
          thumbnail,
        })
      );
    }
  };

  // reviews only for this book
  const bookReviews = pubReviews.filter((item) => item.bookId === _id);

  const avgRatings = bookReviews.length
    ? bookReviews.reduce((acc, item) => acc + item.ratings, 0) /
      bookReviews.length
    : 0;

  return (
    <>
      <Row className="g-2">
        <Col md={6}>
          <div className="m-auto" style={{ maxWidth: "450px" }}>
            <img src={thumbnail} alt="" width={"100%"} />
          </div>
        </Col>
        <Col md={6}>
          <h1>{title}</h1>
          <p>
            {author} - {publishedYear}
          </p>
          <Stars stars={avgRatings} totalReviews={bookReviews.length} />
          <p className="mt-5">{description.slice(0, 130)}...</p>
          <div className="">
            {user?._id ? (
              <Button disabled={!isAvailable} onClick={handleOnBookBorrow}>
                {isAvailable
                  ? "Borrow This Book"
                  : "Expected available date: " +
                    expectedAvailable.slice(0, 10)}
              </Button>
            ) : (
              <Link
                to="/login"
                className=""
                state={{
                  from: { location },
                }}
              >
                <Button>Login to borrow</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
      <Row className="py-5 ">
        <Col>
          {/* tab bar */}

          <Tabs
            defaultActiveKey="description"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="description" title="Description">
              {description}
            </Tab>

            <Tab eventKey="reviews" title="Reviews">
              <ReviewBlock pubReviews={pubReviews} />
            </Tab>
          </Tabs>

          {/* content area  */}
        </Col>
      </Row>
    </>
  );
};

export default BookLanding;
