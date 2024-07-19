import React from "react";
import queryString from "query-string";
import { Navigate, useLocation } from "react-router-dom";

const RedirectPage = ({ children }) => {
  const { search } = useLocation();
  const { name, room } = queryString.parse(search);

  console.log(queryString.parse(search));

  const noQueryString = !name || !room;

  // NOTE: queryString이 없는 경우, 홈으로 redirect
  if (noQueryString) {
    console.log("No query string, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // NOTE: room이 air인 경우, AirConditioner로 redirect
  if (room === "air") {
    console.log("Room is air, redirecting to /air");
    return <Navigate to={`/air?name=${name}&room=null`} />;
  }

  // NOTE: room이 air가 아닌 경우, Chat으로 이동
  console.log("Room is not air, rendering children");
  return children;
};

export default RedirectPage;
