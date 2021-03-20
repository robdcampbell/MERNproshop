import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div >
    <Form onSubmit={submitHandler} inline className="search__box" >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="search__input"
      ></Form.Control>
      <Button type="submit" className="search__btn">
        Search
      </Button>
    </Form>
    </div>
  );
};

export default SearchBox;
