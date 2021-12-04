import { FC, useState } from 'react'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Button
} from '@chakra-ui/react'
import liff from '@line/liff'
import QRCodeReader from './QRCodeReader'
import axios from './axios'

const App: FC = () => {
  const [UIFlag, setUIFlag] = useState<boolean>(true)
  return (
    <ChakraProvider>
      <Container>
        {UIFlag ? (
          <Flex flexDirection='column'>
            <Heading>QRコードにかざしてね</Heading>
            <Box flex={1} height={'100vh'}>
              <QRCodeReader
                onReadQRCode={(result) => {
                  liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
                    .then(() => {
                      if (!liff.isLoggedIn()) {
                        liff.login()
                      }
                      liff.getProfile()
                        .then((profile) => {
                          axios.post('/laf', {
                            userId: profile.userId,
                            itemId: result.getText()
                          })
                            .then(() => {
                              setUIFlag(!UIFlag)
                            })
                            .catch((e: unknown) => {
                              console.error(e)
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
        ) : (
          <Flex flexDirection='column'>
            <Heading>登録が完了しました</Heading>
            <Button color='primary'>Close</Button>
          </Flex>
        )}
      </Container>
    </ChakraProvider>
  )
}

export default App
