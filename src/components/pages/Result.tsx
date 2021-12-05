import { FC, useState, useEffect } from 'react'
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
  useEffect(() => {
    if (!location.state.flag) {
      navigate('/', {replace: true})
    }
    setCompletion(true)
  }, [location.state.flag, navigate])
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Heading textAlign='center'>{completion ? '登録が完了しました' : '通信中です'}</Heading>
          <Box flex={1} height={'100vh'} alignItems='center'>
            <Button color='#0aff84' onClick={() => liff.closeWindow()} disabled={!completion}>Close</Button>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
