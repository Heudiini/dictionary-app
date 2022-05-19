import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./css/dictionary.css";
import Photos from "./Photos";
import Footer from "./Footer";

export default function Dictionary(props) {
  let [keyword, setKeyword] = useState(props.defaultKeyword);
  let [results, setResults] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [photos, setPhotos] = useState(null);

  function handleDictionResponse(response) {
    //console.log(response.data);
    setResults(response.data[0]);
  }
  function handlePexelsResponse(response) {
    //console.log(response.data);
    setPhotos(response.data.photos);
  }

  function search() {
    // documentation: https://dictionaryapi.dev/e
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleDictionResponse);
    // for photos in pexel

    let pexelsApiKey = `563492ad6f91700001000001ab652dccbab04ad7867c7555658ee3a7`;
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=8`;

    let headers = { Authorization: `Bearer ${pexelsApiKey}` };
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  function load() {
    setLoaded(true);
    search();
  }
  //the search needed new state "loaded" that was my bug, remember
  if (loaded) {
    return (
      <div className="container-fluid">
        <div className=" dictionary">
          <div className="formSection">
            <form className="row form" onSubmit={handleSubmit}>
              <input
                className="col input"
                type="search"
                autoFocus={false}
                onChange={handleKeywordChange}
                defaultValue={props.defaultKeyword}
              />{" "}
              <span className="col ">
                <input type="submit" value="Search" className="searchBtn" />
              </span>
              <small>Suggested words: food, plant, vacation..</small>
            </form>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col sm-6">
            {" "}
            <Results results={results} />
          </div>
          <div className="col sm-6 ">
            {" "}
            <Photos photos={photos} />
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    load();
    return "Loading";
  }
}
