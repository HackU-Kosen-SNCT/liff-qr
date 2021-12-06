import { FC } from 'react'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading
} from '@chakra-ui/react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom'
import QRCodeReader from './QRCodeReader'
import axios from 'axios'

const QR: FC = () => {
  const navigate = useNavigate()
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Heading textAlign='center'>QRコードにかざしてね</Heading>
          <Box flex={1} pt={'5vh'} alignItems='center'>
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
                          },
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        })
                        .then(() => {
                          navigate('/result', {replace: false, state: {flag: true}})
                        })
                        .catch(() => {
                          navigate('/result', {replace: false, state: {flag: false}})
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
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default QR
