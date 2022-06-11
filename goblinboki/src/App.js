import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import background from './IMAGE18.png'
import GOBLINBOKI1 from './GOBLINBOKI1.png';
import GoblinLayer from './Goblinslayers2.png';
import FrameConnect from './FrameConnect.png';
import mintImage from './mint.png';
import selector from './selector.png';
import text from './text2.png';
//import ReactDOM from 'react-dom';

const contractAddress = "0x84D1B0fDB36890c86E1514716511abEB22640F99";
const abi = [{
  "inputs": [{
    "internalType": "string",
    "name": "name_",
    "type": "string"
  }, {
    "internalType": "string",
    "name": "symbol_",
    "type": "string"
  }, {
    "internalType": "uint256",
    "name": "startingTime_",
    "type": "uint256"
  }, {
    "internalType": "string",
    "name": "_baseURI_",
    "type": "string"
  }, {
    "internalType": "address[]",
    "name": "payees_",
    "type": "address[]"
  }, {
    "internalType": "uint256[]",
    "name": "shares_",
    "type": "uint256[]"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "inputs": [],
  "name": "ApprovalCallerNotOwnerNorApproved",
  "type": "error"
}, {
  "inputs": [],
  "name": "ApprovalQueryForNonexistentToken",
  "type": "error"
}, {
  "inputs": [],
  "name": "ApprovalToCurrentOwner",
  "type": "error"
}, {
  "inputs": [],
  "name": "ApproveToCaller",
  "type": "error"
}, {
  "inputs": [],
  "name": "BalanceQueryForZeroAddress",
  "type": "error"
}, {
  "inputs": [],
  "name": "MintToZeroAddress",
  "type": "error"
}, {
  "inputs": [],
  "name": "MintZeroQuantity",
  "type": "error"
}, {
  "inputs": [],
  "name": "OwnerQueryForNonexistentToken",
  "type": "error"
}, {
  "inputs": [],
  "name": "TransferCallerNotOwnerNorApproved",
  "type": "error"
}, {
  "inputs": [],
  "name": "TransferFromIncorrectOwner",
  "type": "error"
}, {
  "inputs": [],
  "name": "TransferToNonERC721ReceiverImplementer",
  "type": "error"
}, {
  "inputs": [],
  "name": "TransferToZeroAddress",
  "type": "error"
}, {
  "inputs": [],
  "name": "URIQueryForNonexistentToken",
  "type": "error"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "approved",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "ApprovalForAll",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "contract IERC20",
    "name": "token",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "ERC20PaymentReleased",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "Paused",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "account",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "shares",
    "type": "uint256"
  }],
  "name": "PayeeAdded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "PaymentReceived",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "PaymentReleased",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "Unpaused",
  "type": "event"
}, {
  "inputs": [],
  "name": "COLLECTION_MAX_ITEMS",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "FREE_MINT",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "burn",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "getApproved",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }],
  "name": "isApprovedForAll",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "lockSpecialMint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "maxMintsPerTxFree",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "maxMintsPerTxPostFree",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_numToMint",
    "type": "uint256"
  }],
  "name": "mint",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [],
  "name": "name",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "ownerOf",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "pause",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "paused",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }],
  "name": "payee",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "price",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address payable",
    "name": "account",
    "type": "address"
  }],
  "name": "release",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "contract IERC20",
    "name": "token",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "release",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "contract IERC20",
    "name": "token",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "released",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "released",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }, {
    "internalType": "bytes",
    "name": "_data",
    "type": "bytes"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }, {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "_newBaseURI",
    "type": "string"
  }],
  "name": "setBaseURI",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_newMaxMintsPerTxFree",
    "type": "uint256"
  }],
  "name": "setMaxMintsPerTxFree",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_newMaxMintsPerTxPostFree",
    "type": "uint256"
  }],
  "name": "setMaxMintsPerTxPostFree",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_newPrice",
    "type": "uint256"
  }],
  "name": "setPrice",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_startingTime",
    "type": "uint256"
  }],
  "name": "setStartingTime",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "shares",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address[]",
    "name": "recipients",
    "type": "address[]"
  }, {
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
  }],
  "name": "specialMint",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "specialMintLocked",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "startingTime",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
  }],
  "name": "supportsInterface",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "tokenURI",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalMinted",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "contract IERC20",
    "name": "token",
    "type": "address"
  }],
  "name": "totalReleased",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalReleased",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalShares",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "unpause",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "stateMutability": "payable",
  "type": "receive"
}];

function App() {

  const [error, setError] = useState('')
  const [data, setData] = useState({})
  
  useEffect(() => {
    fetchData();
  }, [])
  
  async function fetchData() {
    if(typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const cost = await contract.price();
        var _totalMinted = await contract.totalMinted();
        const object = {"cost": String(cost), "_totalMinted": String(_totalMinted)}
        setData(object);
      } 
      catch (error) {
        setError(error.message);
      }
    }
  }

  async function connect() {

    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({method: 'eth_requestAccounts'});
      } 
      catch (error) {
        console.log(error);
      };
      const accounts = await window.ethereum.request({method: "eth_accounts"});
      console.log(accounts);
    } 
    else {
      document.getElementById("btn_connect").innerHTML =
        "Please install MetaMask";
    }
  }
  
  async function mint() {
  
    var getMintText = document.getElementById("mintAmount").value;
    console.log(getMintText);
    console.log(typeof (getMintText));
    var getMintValue = parseInt(getMintText);
    console.log(getMintValue);
    console.log(typeof (getMintValue));
  
    if(typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({method : 'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      var _totalMinted = await contract.totalMinted();
      var totalCost = (data.cost * getMintValue)
      console.log(data.cost)
      console.log(getMintValue)
      console.log(totalCost)
      var strTotalCost = String(totalCost)
      //const _totalMinted = 1124
      if (_totalMinted + getMintValue < 1111) {
        try {
          let overrides = {
            from: accounts[0],
            value: 0,
          }
          const transaction = await contract.mint(Int(getMintValue), overrides);
          await transaction.wait();
          fetchData();
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          let overrides = {
            from: accounts[0],
            value: strTotalCost,
          }
          const transaction = await contract.mint(Int(getMintValue), overrides);
          await transaction.wait();
          fetchData();
        }
        catch (error) {
          console.log(error);
        }
      }
   } 
  }

  function clictest() {
    console.log("clic");
    const getMintText = document.getElementById("mintAmount").value;
    console.log(getMintText);
    console.log(typeof (getMintText));
    var getMintValue = parseInt(getMintText);
    console.log(getMintValue);
    console.log(typeof (getMintValue));
  }

  return (

    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <div className="container">
        <div className="banniere">
          <div className="container_title">
            <img src={GOBLINBOKI1} width="700" alt="Errz Gobliinzear"/>
          </div> 
          <div className="container_goblin">
            <img src={GoblinLayer} width="500" alt="Wut?"></img>
          </div> 
          <div className="container_text">
            <img src={text} width="500" alt="Graaaar ze text"></img>
          </div>
          <div className="container_selector">
            <img src={selector} width="300" alt="O muche da ya mint"/>
          </div> 
          <textarea id="mintAmount" name="mintAmount">
            
          </textarea>

          <div className="container_mint">
            <button className="btn_mint" onClick={mint}>
              <img src={mintImage} width="250" alt="Miiiiinterzzz"/>
            </button>
          </div>
          <div className="container_connection">
            <button className="btn_connect" onClick={connect}>
              <img src={FrameConnect} width="280" alt="Connexctorzzz"/>
            </button>
          <div>
            <p className="count">{data._totalMinted} / 10000</p>
            <p className="cost">Each GoblinBoki NFT costs {data.cost / 10**18} eth (excluding gas fees)</p>
          </div>  
         </div> 
      </div>
    </div>
    </div>
  );
}

export default App;