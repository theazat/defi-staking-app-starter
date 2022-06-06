import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";

const App = () => {
  const [balance, setBalance] = useState("0");

  const loadWeb3 = useCallback(async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out Metamask!");
    }
  });

  const loadBlockchainData = useCallback(async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    console.log(account);
  });

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadWeb3()]);

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <h1>Hello World </h1>
      </div>
    </div>
  );
};

export default App;
