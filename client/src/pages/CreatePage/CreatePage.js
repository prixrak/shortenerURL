import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import useHttp from "../../hooks/http.hook.js";
import AuthContext from "../../context/AuthContext.js";

const CreatePage = () => {
  const [link, setLink] = useState("");
  const {request} = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  return (
    <div className="container">
      <div class="justify-content-center d-flex align-items-center mx-auto p-2" style={{minWidth:"200px", maxWidth:"800px", height: "600px"}}>
        <input 
          value={link} 
          onChange={e => setLink(e.target.value)} 
          id="link" 
          type="text"
          placeholder="Enter Link"
          class="form-control border border-dark"
          style={{height:"40px"}}
          onKeyPress={pressHandler}
        />
      </div>
    </div>
  );
};

export default CreatePage;







