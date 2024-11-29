'use client'
import React, {useState, useEffect} from 'react';
import VoterComponent from './components/voter_component.js';
// import {connectWeb3Metamask} from './contract/web3_functions.js';
import getWeb3 from '@/utils/web3/web3.js';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {

  const [contractInstance, setContract] = useState<any>(null)
  const [accounts, setAccounts] = useState<string[]>([])

  useEffect(()=>{ 
    async function connect(){
      // const web3 = new getWeb3();
      // const { accounts, instance } = await web3.connectWeb3();
      // setAccounts(accounts);
      // setContract(instance);
      const provider = await detectEthereumProvider();
      try {
        if (provider) {
          console.log("Metamask found");
          const web3 = new getWeb3(provider);
          const result = await web3.connectWeb3WithMetaMask();
          if (result) {
            const accounts = result.accounts;
            const instance = result.instance;
            setAccounts(accounts);
            setContract(instance);
          } else {
            console.error("Failed to connect to web3");
          }
          // console.log( "--> " ,instance.methods);
        } else {
          alert(
            `Metamask not found. Install metamask!!`
          )
        }
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if((error as any).code !== -32002){
          // alert(
          //   `Failed to load web3, accounts, or contract. Check console for details.`,
          // );
        }
        console.log(" -->", error);
      }
    }
    setTimeout(connect, 1500);
  },[])

  return (
    <div className="App">
       { contractInstance == null ? 
        <>
          <h2 style={{textAlign: "center"}}> Loading Application </h2>
        </> :
        <>
            <VoterComponent contractInstance={contractInstance} account={accounts.length > 0 ? accounts[0] : ''} />
        </>}
    </div>
  );
}

export default App;
