import LedgerFactoryContractAbi from "../contracts/LedgerFactoryAbi.json"  assert {type: 'json'};
import LedgerAbi from "../contracts/LedgerAbi.json"  assert {type: 'json'};
export const POLYGON_MUMBAI = {
                chainId: "0x13881",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                chainName: "Mumbai",
                nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com"]
            }
export const POLYGON_ID = 80001
export const LEDGER_FACTORY_CONTRACT = "0x2fe3Bf6737Ba330fC25512E67b2F7c8aCA167B8f"
export const LEDGER_TEST_CONTRACT = "0x4476EeD4DA0C7d6dB60B5066Bb72811610B07c07"

export const LEDGER_FACTORY_CONTRACT_ABI = LedgerFactoryContractAbi
export const LEDGER_TEST_ABI = LedgerAbi