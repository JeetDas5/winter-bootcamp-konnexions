import React from "react";

const page = async ({ params }) => {
  const {id} = await params;
  return <div>Page with ID: {id}</div>;
};

export default page;
