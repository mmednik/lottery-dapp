import { ethers } from 'ethers'
import QuiniCoin from '../artifacts/contracts/QuiniCoin.sol/QuiniCoin.json'
import { Button } from "@chakra-ui/react"

// Update with the contract address logged out to the CLI when it was deployed 
const quiniCoinAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function UpdateBalance() {

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

  return (
			<Button colorScheme="green" onClick={fetchBalance}>Get tokens balance</Button>
  );
}

export default UpdateBalance;