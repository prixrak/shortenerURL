import React, {useCallback, useContext, useEffect, useState} from "react";
import useHttp from "../../hooks/http.hook.js";
import AuthContext from "../../context/AuthContext.js";
import Loader from "../../components/Loader/Loader.js";
import LinksList from "../../components/LinksList/LinksList.js";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched);
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="table-responsive">
      <div className="container">
        {!loading && links && <LinksList links={links}/>}
      </div>
    </div>
  );
};

export default LinksPage;
