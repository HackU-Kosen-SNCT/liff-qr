import { FC } from 'react'
import {
  ChakraProvider,
  Container,
  Flex,
  Box,
  Text
} from '@chakra-ui/react'
import thankyou from '../../assets/thankyou.svg'

const Result: FC = () => {
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Box>
            <Text color="#02331b" align="center">登録が完了しました！</Text>
            <Text color="#5a7165" align="center">ブラウザを閉じてください。</Text>
            <img alt="Thank you!" src={thankyou} width="10vh" height="10vh" />
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
