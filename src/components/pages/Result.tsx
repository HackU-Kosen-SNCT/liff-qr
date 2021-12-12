import { FC } from 'react'
import {
  ChakraProvider,
  Container,
  Flex,
  Box,
  Text
} from '@chakra-ui/react'
import thankyou from '../../assets/thankyou.svg'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: center
`

const Result: FC = () => {
  return (
    <ChakraProvider>
      <Container>
        <Flex flexDirection='column' alignItems='center'>
          <Box>
            <Text color="#02331b" align="center">登録が完了しました！</Text>
            <Text color="#5a7165" align="center">ブラウザを閉じてください。</Text>
            <StyledDiv>
              <img alt="Thank you!" src={thankyou} width="50%" height="50%" />
            </StyledDiv>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  )
}

export default Result
