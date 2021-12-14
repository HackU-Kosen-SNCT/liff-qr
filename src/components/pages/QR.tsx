import { useContext } from 'react'
import type { VFC } from 'react'
import {
  Text,
  ChakraProvider,
  Container,
  Flex,
  Box,
} from '@chakra-ui/react'
import liff from '@line/liff'
import { useNavigate } from 'react-router-dom'
import QRCodeReader from './QRCodeReader'
import { Naviflag } from '../utils/Naviflag'
import axios from 'axios'
import VConsole from 'vconsole'

const QR: VFC = () => {
  const {scanflag, setScanFlag} = useContext(Naviflag)
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
                      .then(() => {
                        navigate('/result', { replace: false })
                      })
                      .catch(() => {
                        setScanFlag(false)
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
          <Box p={'9.4vw'}>
            { scanflag ? (
              <Text align="center" color="#02331b" fontSize={'3vh'} mb={'3.2vh'}>QRコードにかざしてください</Text>
            ) : (
              <>
                <Text align="center" color="#02331b" fontSize={'2.6vh'}>うまく読み取れなかったので</Text>
                <Text align="center" color="#02331b" fontSize={'2.6vh'} mb={'3.2vh'}>もう一度お願いします</Text>
              </>
            ) }
            <Box fontSize={'2.5vh'}>
              <Box align="center" mb={'1.5vh'}>
                <Text color="#5a7165">QRコードを読むと</Text>
                <Text color="#5a7165">あなたが落とし物を拾ったことを</Text>
                <Text color="#5a7165">登録します。</Text>
              </Box>
              <Box align="center">
                <Text color="#5a7165">他のユーザにあなたの情報が</Text>
                <Text color="#5a7165">公開されることはありません。</Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default QR
