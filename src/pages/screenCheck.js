import React from 'react';

class LargeScreen extends React.Component {
    

    render() {
        return(
<div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Welcome to IndyGeneUS
          </p>
          <a
            className="App-link"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hi! Kindly logon with a mobile device to continue...
          </a>
        </header>
      </div>
        )
        

    }
}

export default LargeScreen