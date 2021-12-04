import React from 'react'
import logo from './logo.svg';
import liff from '@line/liff'
import './App.css';

const App: React.FC = () => {
  React.useEffect(() => {
    liff.init({liffId: process.env.LIFF_ID as string || process.env.REACT_APP_LIFF_ID as string})
      .then(() => {
        if(!liff.isLoggedIn()) {
          liff.login({})
        }
        else if(liff.isInClient()) {
          liff.scanCodeV2()
            .then((result) => {
              const itemId = result.value
              if ( itemId ) {
                liff.getProfile()
                  .then((profile) => {
                    const userId = profile.userId
                    console.log(itemId, userId) // TODO post to server
                  })
                  .catch((e: unknown) => {
                    console.error(e)
                  })
              }
              else {
                console.error('Invalid itemId is null or out of range.')
              }
            })
            .catch((e: unknown) => {
              console.error(e)
            })
        }
        else {
          console.error('Login process did not complete')
        }
      })
    .catch((e: unknown) => {
      console.error(e)
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
