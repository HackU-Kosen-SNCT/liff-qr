import React from 'react'
import liff from '@line/liff'
import Button from '@material-ui/core/Button';
import './App.css';

const App: React.FC = () => {
  const [ value, setValue ] = React.useState<string>('')
  const qr = ():void => {
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
                    setValue(`${itemId}, ${userId}`) // TODO post to server
                  })
                  .catch((e: unknown) => {
                    console.error(e)
                  })
              }
              else {
                console.error('Invalid itemId is null or out of range.')
              }
            })
            .then(() => {
              liff.closeWindow()
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
  }
  return (
    <div className="App">
      <div className="qrValue">{value}</div>
      <div className="qrButton">
        <Button variant="contained" color="primary" onClick={() => qr()}>
          Open QR camera
        </Button>
      </div>
    </div>
  );
}

export default App;
