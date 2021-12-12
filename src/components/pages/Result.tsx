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
            <Box as="div" textAlign="center">
              <img alt="Thank you!" src={thankyou} width="50%" height="50%" />
            </Box>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
