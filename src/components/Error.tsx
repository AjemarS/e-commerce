import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

interface ErrorProps {
  error?: SerializedError | FetchBaseQueryError;
}

const Error: React.FC<ErrorProps> = (error) => {
  return error && <div>{"error"}</div>;
};

export default Error;
