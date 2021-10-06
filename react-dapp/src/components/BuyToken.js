import { useState } from 'react';
import { ethers } from 'ethers'
import QuiniCoin from '../artifacts/contracts/QuiniCoin.sol/QuiniCoin.json'
import { Flex, IconButton, Input } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'


function BuyToken() {
	const [tokens, buyTokensValue] = useState()
	const quiniCoinAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

	async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

	async function buyTokens() {
		if (!tokens) return
		if (typeof window.ethereum !== 'undefined') {
			await requestAccount()
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner()
			const contract = new ethers.Contract(quiniCoinAddress, QuiniCoin.abi, signer)
			const transaction = await contract.buyToken(tokens)
			await transaction.wait()
		}
	}
		
  return (
    <Flex>
        <Input onChange={e => buyTokensValue(e.target.value)} placeholder="Amount of tokens to buy" />
        <IconButton icon={<AddIcon />} colorScheme="green" onClick={buyTokens} aria-label="Buy tokens" />
    </Flex>
  );
}

export default BuyToken;