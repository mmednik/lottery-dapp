import './App.css';
import { ChakraProvider, Flex, Center, Heading, Container, VStack, Button, IconButton, Input } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'
import GenerateTokens from './components/GenerateTokens'
import Balance from './components/Balance'
import UpdateBalance from './components/UpdateBalance'
import BuyToken from './components/BuyToken'


function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Container>
        <header className="App-header">
          <Center>
            <StarIcon color="gray.700" />
            <Heading color="gray.700" padding="8">QuiniCoin</Heading>
            <StarIcon color="gray.700" />
          </Center>
        </header>
        <main className="App-main">
          <VStack spacing={4} align="stretch">

            <Balance />

            <UpdateBalance />

            <GenerateTokens />

            <BuyToken />

          </VStack>
        </main>
        <footer className="App-footer">
        </footer>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;