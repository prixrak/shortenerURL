import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/http.hook.js";
import AuthContext from "../../context/AuthContext.js";
import Loader from "../../components/Loader/Loader.js";
import LinkCard from "../../components/LinkCard/LinkCard.js";

const DetailPage = () => {
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if(loading) {
    return <Loader/>;
  }
  return (
    <div className="container">
      {!loading && link && <LinkCard link={link}/>}
    </div>
  );
}

export default DetailPage;
