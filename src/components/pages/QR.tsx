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

const QR: FC = () => {
  const navigate = useNavigate()
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column'>
          <Box flex={1} height={'100vh'}>
            <Heading>QRコードにかざしてね</Heading>
            <QRCodeReader
              onReadQRCode={(result) => {
                liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
                  .then(() => {
                    if (!liff.isLoggedIn()) {
                      liff.login()
                    }
                    liff.getProfile()
                      .then((profile) => {
                        navigate('/result', {state: {user: profile.userId, item: result.getText()}})
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
