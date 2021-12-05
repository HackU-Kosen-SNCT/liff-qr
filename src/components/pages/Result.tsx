import { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
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
    axios.patch('/users', {
      userId: location.state.user as string,
      itemId: location.state.item as string
    })
      .then(() => {
        setCompletion(true)
      })
      .catch(() => {
        navigate('/')
      })
  }, [location.state.item, location.state.user, navigate])
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column'>
          <Box flex={1} height={'100vh'}>
            <Heading>{completion ? '登録が完了しました' : '通信中です'}</Heading>
            <Button colorScheme='#0aff84' onClick={() => liff.closeWindow()} disabled={!completion}>Close</Button>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
