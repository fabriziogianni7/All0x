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
export const LEDGER_FACTORY_CONTRACT = "0x720b67535A3331dd336f13d506D5EeDEf12497eb"
export const LEDGER_TEST_CONTRACT = "0xAa14aCCeB29c23BE227B8360a4F11DE65E7E1868"

export const LEDGER_FACTORY_CONTRACT_ABI = LedgerFactoryContractAbi
export const LEDGER_TEST_ABI = LedgerAbi