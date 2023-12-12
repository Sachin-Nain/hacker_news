import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import "./index.css";

function Expand_Result(props) {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://hn.algolia.com/api/v1/items/${props.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
    setTimeout(() => {
      setLoader(false);
      setShow(true);
    }, 1500);
  }, []);

  function moreComments() {}

  function goToHome() {
    navigate("/");
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
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
      {show && (
        <div className="home1">
          <div id="subsection"></div>
          <div className="mainTitle">
            <h1 style={{ fontSize: "5rem", color: "white" }}>𝙷𝚊𝚌𝚔𝚎𝚛 𝙽𝚎𝚠𝚜</h1>
          </div>
          <div className="expandedResult">
            <h3 style={{ fontSize: "xx-large" }}>{data.title}</h3>
            <p style={{ fontSize: "x-large" }}>
              <b>Points :-</b> {data.points}
            </p>
            <button
              type="button"
              className="btn btn-success"
              onClick={goToHome}
              style={{ fontSize: "larger" }}
            >
              Back to Search
            </button>
          </div>
          <div style={{ margin: "0 0 2% 10%", color: "white" }}>
            <h2>List of all Comments</h2>
          </div>
          <div style={{ margin: "0 0 2% 0" }}>
            {data.children?.map((user) => (
              <div
                dangerouslySetInnerHTML={{ __html: `● ${user.text}` }}
                className="comments"
              ></div>
            ))}
          </div>
          <div style={{ float: "right" }}>
            <div className="gotoTop">
              <a href="#subsection">
                <img
                  src={require("./top1.png")}
                  alt="go to top"
                  style={{ borderRadius: "60px", width: "100%" }}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Expand_Result;
