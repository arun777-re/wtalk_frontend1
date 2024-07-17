import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
 const handleSearch = (e)=>{
  e.preventDefault();
  if(searchTerm){
    navigate(`/user/searchuser/${searchTerm}`)
  }
  setSearchTerm('')
 }

  return (
    <Paper
      component={"form"}
      onSubmit={handleSearch}
      sx={{
        border: "2px solid #ccc",
        boxShadow: "none",
        display: "flex",
        px: "25px",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="submit">
      <SearchIcon sx={{color:"#green",cursor:"pointer",
      textAlign:"center"}} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
