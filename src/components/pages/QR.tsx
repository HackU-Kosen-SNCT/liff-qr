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
import axios from '../lib/axios'

const QR: FC = () => {
  const navigate = useNavigate()
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Heading textAlign='center'>QRコードにかざしてね</Heading>
          <Box flex={1} w={'80%'} py={'40%'} alignItems='center'>
            <QRCodeReader
              onReadQRCode={(result) => {
                liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
                  .then(() => {
                    if (!liff.isLoggedIn()) {
                      liff.login()
                    }
                    liff.getProfile()
                      .then((profile) => {
                        axios.patch('/laf', {
                          userId: profile.userId,
                          itemId: result.getText()
                        })
                        .then(() => {
                          navigate('/result', {replace: true, state: {flag: true}})
                        })
                        .catch(() => {
                          navigate('/result', {replace: true, state: {flag: false}})
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
