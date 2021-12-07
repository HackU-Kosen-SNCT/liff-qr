import { FC, useState, useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ChakraProvider,
  Container,
  Flex,
  Box,
  Heading,
  Button
} from '@chakra-ui/react'
import liff from '@line/liff'

const Result: FC = () => {
  const [completion, setCompletion] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    setCompletion(location.state.flag as boolean)
  }, [location.state.flag])
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Heading textAlign='center'>{completion ? '登録が完了しました' : '登録に失敗しました'}</Heading>
          <Box flex={1} height={'100vh'} alignItems='center' py={'20vh'}>
            <Button color='#0aff84' onClick={() => navigate('/', {replace: false})} disabled={completion}>Scan again</Button>
            <Button color='#0aff84' onClick={() => liff.closeWindow()} disabled={!completion}>Close</Button>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
