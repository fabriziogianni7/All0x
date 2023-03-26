import LedgerFactoryContractAbi from "../contracts/LedgerFactoryAbi.json"  assert {type: 'json'};
import LedgerAbi from "../contracts/LedgerAbi.json"  assert {type: 'json'};
import { SdkConfig } from "@connext/sdk";
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
export const LEDGER_FACTORY_CONTRACT = "0x56f4287a546aC5c6077eA9542A80017b16882441"
export const LEDGER_TEST_CONTRACT = "0x956750Dd93c28Ca4faf032278CD03A8D9817b000"

export const LEDGER_FACTORY_CONTRACT_ABI = LedgerFactoryContractAbi
export const LEDGER_TEST_ABI = LedgerAbi

export const PAYMENT_EXPERIENCE_URL = `https://all0x-4d03fa.spheron.app/payment/0x956750Dd93c28Ca4faf032278CD03A8D9817b000?shop=xyzShop&networkId=80001&prods=%5B%7B%22name%22%3A%22prodA%22%2C%22quantity%22%3A1%2C%22price%22%3A5%2C%22prodId%22%3A%22prodIdRand1234%22%7D%2C%7B%22name%22%3A%22prodB%22%2C%22quantity%22%3A1%2C%22price%22%3A5%2C%22prodId%22%3A%22prodIdRand1234%22%7D%5D`


export const SDK_CONFIG: SdkConfig = {
    signerAddress: "",
    // Use `mainnet` when you're ready...
    network: "testnet",
    // Add more chains here! Use mainnet domains if `network: mainnet`.
    // This information can be found at https://docs.connext.network/resources/supported-chains
    chains: {
        1735353714: { // Goerli domain ID
            providers: ["https://rpc.ankr.com/eth_goerli"],
        },
        1735356532: { // Optimism-Goerli domain ID
            providers: ["https://goerli.optimism.io"],
        },
        9991: { // Polygon
            providers: ["https://polygon-mumbai.blockpi.network/v1/rpc/public"],
        },
        2053862260: { // zk_sync_era
            providers: ["https://testnet.era.zksync.dev"],
        },
    },
};

export const MUMBAI_ORIGIN_ASSET = "0xeDb95D8037f769B72AAab41deeC92903A98C9E16"
export const MUMBAI_ID : string= "9991"

export const GOERLI_ORIGIN_ASSET = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1"
export const GOERLI_ID = "1735353714"

export const ZK_SYNC_ORIGIN_ASSET = "0x7C1412e456ad60B8ee458c4eb3A9852C3e389353"
export const ZK_SYNC_ID = "2053862260"

export const GOERLI_OPTIMISM_ORIGIN_ASSET = "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF"
export const GOERLI_OPTIMISM_ID = "1735356532"