import Web3 from 'web3';
import { abi } from  '../../../contract/build/contracts/Voting.json';
// import withMetaMask from '../hoc/withMetaMask';

const contractAddress = "0xC5443Cb91112196B178fCD010aA73a67880b1E5e";

const loadContract = async (web3, account, error) => {
  try {
    const contract = new web3.eth.Contract(abi, contractAddress, { from: account });
    return contract;
  } catch (err) {
    console.error("Failed to load contract:", error);
    throw error;
  }
};

export default loadContract;