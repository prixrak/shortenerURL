import React, {} from "react";

const LinkCard = ({ link }) => {
  return (
    <div class="justify-content-center d-flex align-items-center mx-auto p-2" style={{minWidth:"200px", maxWidth:"800px", height: "600px"}}>
      <div>
        <h2>Link</h2>

        <p>Shorten URL: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>Original URL: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Num of clicks: <strong>{link.clicks}</strong></p>
        <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </div>
    </div>
  );
};

export default LinkCard;