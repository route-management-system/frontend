import React from "react";

const SearchResults = props => {
    console.log(props.r.address)
    return (
        <li key={props.r.id}>
           <div className="title">{props.r.address.freeformAddress}</div>
          {/* <div className="info">{props.address.freeformAddress}</div>  */}
        </li>
    )
  
}

export default SearchResults;

