import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { LEDGER_FACTORY_CONTRACT_ABI, LEDGER_FACTORY_CONTRACT, LEDGER_TEST_CONTRACT, POLYGON_MUMBAI, LEDGER_TEST_ABI } from './constants';

interface Web3ContextType {
    provider?: ethers.providers.Web3Provider
    signer?: ethers.providers.JsonRpcSigner
    account?: any
    connectSigner: () => void
    connectToDefaultNetwork: () => any
    initLedgerTestContract: (merchant_ledger:string) => any
}

export const Web3Context = createContext<Web3ContextType>({
    account: "",
    provider: {} as ethers.providers.Web3Provider,
    signer:{} as ethers.providers.JsonRpcSigner,
    connectSigner: () => { },
    connectToDefaultNetwork: () => { },
    initLedgerTestContract: (merchant_ledger:string) => { }
});


export const Web3Provider = ({ children }: { children: ReactNode }) => {

    const provider: any = useRef(undefined);
    const signer: any = useRef(undefined);

    const [_account, _setAccount] = useState<any>()
    const [_signer, _setSigner] = useState<any>()




    useEffect(() => {


        // setSigner(acc)
        checkWindowEthereum();

        //setting account
        checkAccountAndSigner();

        // subscribing to wallet events:
        accChangedEvent()









    }, [_account, signer])

    const checkWindowEthereum = () => {
        if (!window.ethereum)
            alert("MetaMask not installed; using read-only defaults");
        else {
            provider.current = new ethers.providers.Web3Provider(window.ethereum);
        }
    }

    const checkAccountAndSigner = () => {
        if (!localStorage.getItem("account")) {
            connectSigner();
        } else {
            _setAccount(localStorage.getItem("account"));
            getSigner();
        }
    }

    const getSigner = async () => {
        try {
            signer.current = await provider.current.getSigner()
            _setSigner(signer.current)
            console.log("new singre", signer.current)
        } catch (error) {
            console.log(error)
        }
    }

    const connectSigner = async () => {
        try {
            const accs = await provider?.current.send('eth_requestAccounts', [])
            localStorage.setItem("account", accs[0])
            _setAccount(accs[0])
            await connectToDefaultNetwork()

        } catch (error) {
            console.log(error)
        }
    }


    const connectToDefaultNetwork = async () => {
        try {
            const x = await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [POLYGON_MUMBAI]
            });
        } catch (error) {
            console.log(error)
        }
    }

    const accChangedEvent = () => {
        return window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            const acc: string = accounts[0]
            localStorage.setItem('account', acc)
            _setAccount(acc);
            getSigner();
        })
    }

    const initLedgerTestContract = async (merchant_ledger:string) => {
        try {
            if (!signer) {
                await getSigner()
            }

            const ledger = new ethers.Contract(merchant_ledger, LEDGER_TEST_ABI, signer.current)


            return ledger

        } catch (error) {
            console.log(error)
        }
    }



    return (<Web3Context.Provider value={{
        account: _account,
        provider: provider.current,
        signer: signer.current,
        connectSigner,
        connectToDefaultNetwork,
        initLedgerTestContract
    }}>
        {children}
    </Web3Context.Provider>)
}

export const Web3Consumer = Web3Context.Consumer





