import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import "./index.css";
import axios from "axios";
import Result from "./result";

function Search(props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);

  const allResult = result.map((data) => {
    return <Result data={data} uid={props.uid} />;
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    searchResult();
    setTimeout(()=>{
        setLoader(false);
        setShow(true);
    },1500);
  }, []);

  function searchResult() {
    axios
      .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      .then((response) => {
        console.log(response.data);
        setResult(response.data.hits?.slice(0, 10));
      });
    setQuery("");
  }

  return (
    <>
      {loader && (
        <ColorRing
        visible={true}
        height="100vh"
        width="100vw"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      )}

      {show && (
        <div className="home">
          <div className="mainTitle">
            <h1 style={{ fontSize: "5rem", color:"white"}}>𝙷𝚊𝚌𝚔𝚎𝚛 𝙽𝚎𝚠𝚜</h1>
          </div>
          <div style={{ width: "40%", margin: "6% 30% 4%" }}>
            <div className="input-group">
              <input
                type="text"
                style={{ fontSize: "x-large" }}
                onChange={handleChange}
                placeholder="Search here..."
                value={query}
                className="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
              />
              <a
                href="#"
                onClick={searchResult}
                style={{ textDecoration: "none" }}
              >
                <span
                  className="input-group-text"
                  style={{ fontSize: "x-large" , background:"transparent"}}
                >
                  &#128269;
                </span>
              </a>
            </div>
          </div>
          <div className="relatedResult">
            <h2>Result related to your search :-</h2>
          </div>
          <div>{allResult}</div>
        </div>
      )}
    </>
  );
}

export default Search;
