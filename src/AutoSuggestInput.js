import React, { useState } from "react";
import { apiRequest } from "./helpers";

function AutoSuggestInput() {
  const [value, setValue] = useState("");
  const [apiResults, setApiResults] = useState([
    { id: 1, name: "Magneto" },
    { id: 2, name: "Maria" }
  ]);
  const pubKey = "55ec7aa62a4e72debd301862d73a1b80";

  const handleChange = async e => {
    setValue(e.target.value);

    if (value.length > 1) {
      //call api
      const res = await apiCall();
      //setApiResults(res.data) --> MARVERL api and website has an issue
      console.log(res);
    }
  };
  const apiCall = async () => {
    return await apiRequest(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${value}&apikey=${pubKey}`,
      "GET"
    );
  };

  const data = (
    <datalist id="list">
      {apiResults.map(res => (
        <option key={res.id} value={res.name} />
      ))}
    </datalist>
  );

  return (
    <div className="searchContainer">
      <label for="searchInput">Search</label>
      <div>
        <input
          className="inputField"
          id="searchInput"
          value={value}
          type="search"
          name="search"
          list="list"
          placeholder="Search terms"
          onChange={handleChange}
        ></input>
        {value.length > 1 && data}
        <button
          className={
            value.length > 0 ? "primary activeBtn" : "primary disabledBtn"
          }
          disabled={value.length < 1}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default AutoSuggestInput;
