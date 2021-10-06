import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import QuiniCoin from './artifacts/contracts/QuiniCoin.sol/QuiniCoin.json'
import { ChakraProvider, Flex, Center, Heading, Container, VStack, Button, IconButton, Input } from "@chakra-ui/react"
import { AddIcon, StarIcon } from '@chakra-ui/icons'
import TokenBalance from './components/TokenBalance'
import BuyToken from './components/BuyToken'

// Update with the contract address logged out to the CLI when it was deployed 
const quiniCoinAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  const [tokens, generateTokensValue] = useState()

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(quiniCoinAddress, QuiniCoin.abi, provider)
      try {
        const data = await contract.balanceOf()
        console.log('data: ', data.toString())
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function generateTokens() {
    if (!tokens) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(quiniCoinAddress, QuiniCoin.abi, signer)
      const transaction = await contract.generateTokens(tokens)
      await transaction.wait()
      fetchBalance()
    }
  }


  return (
    <ChakraProvider>
      <div className="App">
        <Container>
        <header className="App-header">
          <Center>
            <StarIcon />
            <Heading color="gray.700" padding="8">QuiniCoin</Heading>
            <StarIcon />
          </Center>
        </header>
        <main className="App-main">
          <VStack spacing={4} align="stretch">

            <TokenBalance />

            <Flex>
              <Input onChange={e => generateTokensValue(e.target.value)} placeholder="Amount of tokens to generate" />
              <IconButton icon={<AddIcon />} colorScheme="orange" onClick={generateTokens} aria-label="Generate tokens" />
            </Flex>

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