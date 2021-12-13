import { FC } from 'react'
import {
  ChakraProvider,
  Container,
  Box,
  Text,
  Image
} from '@chakra-ui/react'
import thankyou from '../../assets/thankyou.svg'

const Result: FC = () => {
  return (
    <ChakraProvider>
      <Container>
        <Box flex={1} alignItems='center' justifyContent="center">
          <Text color="#02331b" align="center">登録が完了しました！</Text>
          <Text color="#5a7165" align="center">ブラウザを閉じてください。</Text>
          <Image alt="Thank you!" src={thankyou} w="50%" h="50%" />
        </Box>
      </Container>
    </ChakraProvider>
  )
}

export default Result
