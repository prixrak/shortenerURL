import React from "react";
import { Link } from "react-router-dom";


const LinksList = ({ links }) => {
  if (!links.length) {
    return <h1 className="center">No links yet</h1>;
  }
  return (
    <table class="table caption-top">
      <caption className="fs-1">List of Links</caption>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Original</th>
          <th scope="col">Shorten</th>
          <th scope="col">Open</th>
        </tr>
      </thead>
      <tbody>
        {
          links.map((link, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={ `/detail/${link._id}` } >Open</Link>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default LinksList;