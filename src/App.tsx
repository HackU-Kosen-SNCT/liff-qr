import { FC, useState } from 'react'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Button,
  Table,
  Tr,
  Td,
  Fade,
  Tbody
} from '@chakra-ui/react'
import liff from '@line/liff'
import QRCodeReader from './QRCodeReader'
import axios from './axios'

const QRCodeResult: FC<{ QRCodes: string[] }> = ({ QRCodes }) => {
  return (
    <Table>
      <Tbody>
        {QRCodes.map((QR, i) => (
          <Tr key={i}>
            <Td>
              <Fade in={true}>{QR}</Fade>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const App: FC = () => {
  const [result, setResult] = useState<string[]>([])
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column'>
          <Heading>QRコードにかざしてね</Heading>
          <Box flex={1} height={'70vh'}>
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
                          .then((response) => {
                            setResult((r) => {
                              return [response.data, ...r]
                            })
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
          <Box flex={1} height={'30vh'}>
            <Heading>登録が完了しました</Heading>
            <QRCodeResult QRCodes={result} />
            <Button color='primary' onPress={() => {liff.closeWindow()}}>Close</Button>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default App
