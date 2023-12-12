import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Expand_Result from "./expand_result";

function Result(props) {
  const navigate = useNavigate();

  function getAllDetails() {
    console.log("yes");
    props.uid(props.data.story_id);
    navigate("/expand");
    <Expand_Result id={props.data.story_id} />
  }

  return (
    <div className="resultList" onClick={getAllDetails} key={props.data.story_id}>
      <h3 style={{ color: "cadetblue" }}>{props.data?.title}</h3>
      <p>
        <b>Author :-</b>{" "}
        <span style={{background:"brown"}}>
          {props.data.author.toUpperCase()}
        </span>
      </p>
      <p>
        <b>Number of Children :-</b> {props.data.children?.length}{" "}
        <span style={{ float: "right", color: "forestgreen" }}>
          Story id:- {props.data.story_id}
        </span>
      </p>
    </div>
  );
}

export default Result;
