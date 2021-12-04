import { FC, useEffect, useState, useRef } from 'react'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import { Result } from '@zxing/library'
import {
  Box,
  ChakraProvider,
  Container,
  Fade,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Tr
} from '@chakra-ui/react'
import liff from '@line/liff'

const QRCodeReader: FC<{ onReadQRCode: (text: Result) => void }> = ({ onReadQRCode }) => {
  const controlRef = useRef<IScannerControls | null>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }
    const codeRender = new BrowserQRCodeReader()
    codeRender.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result, error, controls) => {
        if (error) {
          return
        }
        if (result) {
          onReadQRCode(result)
        }
        controlRef.current = controls
      }
    )
    return () => {
      if (!controlRef.current) {
        return
      }
      controlRef.current.stop()
      controlRef.current = null
    }
  }, [onReadQRCode])

  return (
    <video
      style={{ maxWidth: "100%", maxHeight: "100%", height: "100%" }}
      ref={ videoRef }
    />
  )
}

/**This is for debugging **/
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
  const [QRCodes, setQRCodes] = useState<string[]>([])
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column'>
          <Box flex={1} height={'60vh'}>
            <QRCodeReader
              onReadQRCode={(result) => {
                liff.init({ liffId: process.env.LIFF_ID as string || process.env.REACT_APP_LIFF_ID as string })
                  .then(() => {
                    if (!liff.isLoggedIn()) {
                      liff.login()
                    }
                    liff.getProfile()
                      .then((profile) => {
                        const data = `${result.getText()}, ${profile.userId}`
                        setQRCodes((codes) => {
                          return [data, ...codes]
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
          <Box flex={1} height={'40vh'}>
            <Heading>Result</Heading>
            <QRCodeResult QRCodes={QRCodes} />
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default App
