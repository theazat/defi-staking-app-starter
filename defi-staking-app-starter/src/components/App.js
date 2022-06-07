import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState("0");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected! You can check out Metamask!");
    }
  };

  const loadBlockchainData = async () => {
    try {
      setLoading(false);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const localAccount = accounts[0];

      setAccount(simplifyAccount(accounts[0]));
      const netWorkId = await web3.eth.net.getId();

      // Load Tether Contract
      const tetherData = Tether.networks[netWorkId];
      if (tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
        setTether(tether);
        let tetherBalance = await tether.methods.balanceOf(localAccount).call();
        setTetherBalance(tetherBalance.toString());
      } else {
        window.alert(
          "Error! Tether contract not deployed - no detected network!"
        );
      }

      // Load RWD Contract
      const rwdData = RWD.networks[netWorkId];
      if (rwdData) {
        const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
        setRwd(rwd);
        let rwdBalance = await rwd.methods.balanceOf(localAccount).call();
        setRwdBalance(rwdBalance.toString());
      } else {
        window.alert("Error! RWD contract not deployed - no detected network!");
      }

      // Load DecentralBank Contract
      const decentralBankData = DecentralBank.networks[netWorkId];
      if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(
          DecentralBank.abi,
          decentralBankData.address
        );
        setDecentralBank(decentralBank);
        let stakingBalance = await decentralBank.methods
          .stakingBalance(localAccount)
          .call();
        setStakingBalance(stakingBalance.toString());
      } else {
        window.alert(
          "Error! DecentralBank contract not deployed - no detected network!"
        );
      }
    } catch (error) {
      console.error("Something went wrong! " + error);
    }
  };

  function simplifyAccount(account) {
    // 0x45Ba10d457dd4e7E2f29DC390E534c6200D593a0
    const firstFour = account.slice(0, 4);
    const lastFour = account.substr(account.length - 4);

    // 0x45.....93a0
    return firstFour + "....." + lastFour;
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  let content;

  {
    loading
      ? (content = (
          <p id="loader" className="text-center" style={{ margin: "30px" }}>
            LOADING PLEASE..
          </p>
        ))
      : (content = <Main />);
  }
  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "600px", minHeight: "100vm" }}
          >
            <div>{content}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
