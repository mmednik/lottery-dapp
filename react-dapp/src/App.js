import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import QuiniCoin from './artifacts/contracts/QuiniCoin.sol/QuiniCoin.json'

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
    <div className="App">
      <header className="App-header">
        <h1>QuiniCoin</h1>
      </header>
      <main className="App-main">
        <button onClick={fetchBalance}>Tokens balance</button>
        <button onClick={generateTokens}>Generate tokens</button>
        <input onChange={e => generateTokensValue(e.target.value)} placeholder="Tokens amount" />
      </main>
      <footer className="App-footer">
      </footer>
    </div>
  );
}

export default App;