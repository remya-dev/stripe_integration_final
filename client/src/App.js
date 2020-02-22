import React from "react";
import Checkout from "./checkout";
import Heading from "./components/Heading";

import "./App.css";

function App() {
  return (
    <div className="App">
<Heading/>
      <div className="sr-root">
	
        <div className="sr-content">
          <div className="baby_goods">
            <img
              src="https://cdn2.momjunction.com/wp-content/uploads/2015/03/11-Best-Baby-Product-Brands-In-2019-910x1024.jpg"
              width="200"
              height="250"
            />
          </div>
        </div>
<div className="sr-content"> </div>
        <div className="sr-main">
          <header className="sr-header">
            <div className="sr-header__logo" />
          </header>

          <Checkout/>
        </div>

      </div>      
    </div>
  );
}

export default App;
