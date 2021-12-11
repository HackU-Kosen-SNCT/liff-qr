import { FC } from 'react'
import {
  ChakraProvider,
  Container,
  Flex,
} from '@chakra-ui/react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom'
import QRCodeReader from './QRCodeReader'
import axios from 'axios'
import VConsole from 'vconsole'

const QR: FC = () => {
  const navigate = useNavigate()
  const vConsole = new VConsole()
  vConsole.show()
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <QRCodeReader
            onReadQRCode={(result) => {
              liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
                .then(() => {
                  if (!liff.isLoggedIn()) {
                    liff.login()
                  }
                  liff.getProfile()
                    .then((profile) => {
                      axios({
                        method: 'PATCH',
                        url: 'http://localhost:3000/laf/registrant',
                        data: {
                          registrant: profile.userId,
                          item_id: result.getText()
                        }
                      })
                      .then((r) => {
                        console.log(r)
                        navigate('/result', {replace: false, state: {flag: true}})
                      })
                      .catch((e: unknown) => {
                        console.log(e)
                        navigate('/result', {replace: false, state: {flag: true}})
                      })
                    })
                    .catch((e: unknown) => {
                      console.error(e)
                    })
                })
                .catch((e: unknown) => {
                  console.error(e)
                })
            }}
          />
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default QR
