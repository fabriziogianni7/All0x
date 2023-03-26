import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Web3Context } from "context";
import ProductTab from "@/components/shared/product-tab";
import { BigNumber, ethers } from "ethers";
import { GOERLI_ID, GOERLI_ORIGIN_ASSET, LEDGER_TEST_CONTRACT, MUMBAI_ID, MUMBAI_ORIGIN_ASSET, POLYGON_ID, SDK_CONFIG } from "context/constants";
import { create, SdkConfig } from "@connext/sdk";
import { useRouter } from 'next/router'
import { usePaymentInfoModal } from "../../components/layout/payment-info-modal";


export type ProductToBuy = {
  name: string,
  quantity: number
  price: number
  prodId: string
}


const prods: ProductToBuy[] = [
  {
    "name": "prodA",
    "quantity": 1,
    "price": 4,
    "prodId": "prodIdRand1234"
  },
  {
    name: "prodB",
    "quantity": 1,
    "price": 5,
    "prodId": "prodIdRand1234"
  }
]

/**
 * @FLOW
 * 1 shift to goerli
 * 2 call greeter receiver
 */
// FROM GOERLI TO MUMBAI
export default function Payment(): JSX.Element {
  const { account, signer } = useContext(Web3Context)
  const [products, setProds] = useState<any>()
  const [buttonPrice, setButtonPrice] = useState<number>(0)
const { PaymentInfoModal, setShowPaymentInfoModal } = usePaymentInfoModal();

  const router = useRouter()
  const queryString = router.query

  useEffect(() => { setShowPaymentInfoModal(true) }, [])

  useEffect(() => {

    const ad = "0x61bAfaDB21adF54D1f9BfBA92d2E463b042894eF"

    const params = {
      shop: "xyzShop",
      networkId: "80001",
      prods:prods
    }
    const prs = encodeURIComponent(JSON.stringify(prods))

    console.log("urlsssss",
    `http://localhost:3000/payment/${ad}?shop=xyzShop&networkId=80001&prods=${prs}`)

    if (queryString?.prods) {
      const decod = decodeURIComponent(queryString?.prods as string)
      const prodsDecoded = JSON.parse(decod) as ProductToBuy[]
      setProds(prodsDecoded)
      const price = prodsDecoded.reduce((acc: number, p: ProductToBuy) => acc += p.price, 0)
      setButtonPrice(price)
    }

  }, [queryString])


  const initConnext = async () => {
    //init sdk 
    console.log("account", account)
    SDK_CONFIG.signerAddress = account
    const { sdkBase } = await create(SDK_CONFIG);
    console.log('sdkBase: ', sdkBase);

    const originDomain = GOERLI_ID// Mumbai domain ID
    const destinationDomain = MUMBAI_ID // Goerli domain ID
    const originAsset = GOERLI_ORIGIN_ASSET // TEST on mUmbai
    // const originAsset = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1";
    const amount = "1000000000000000000000";
    const slippage = "10000";
    // Estimate the relayer fee
    const relayerFee = (
      await sdkBase.estimateRelayerFee({
        originDomain,
        destinationDomain
      })
    ).toString();





    const customerID = "myCustomerId";
    const customerAddress = account;
    const productIDs = [1, 2, 3];
    const totalPaid = 1000;

    const encodedParams = ethers.utils.defaultAbiCoder.encode(
      ['string', 'address', 'uint256[]', 'uint256'],
      [customerID, customerAddress, productIDs, totalPaid]
    );

    // `encodedParams` is now a hex-encoded string that represents the encoded parameters
    console.log(encodedParams);
    const callData = encodedParams
    // Prepare the xcall params
    const xcallParams = {
      origin: originDomain,           // send from Goerli
      destination: destinationDomain, // to Optimism-Goerli
      to: account,              // the address that should receive the funds on destination //address of ledger!!!
      asset: originAsset,             // address of the token contract
      delegate: account,        // address allowed to execute transaction on destination side in addition to relayers
      amount: amount,                 // amount of tokens to transfer
      slippage: slippage,             // the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
      callData: callData,                 // empty calldata for a simple transfer (byte-encoded)
      relayerFee,         // fee paid to relayers 
    };
    return { originDomain, originAsset, destinationDomain, amount, xcallParams, sdkBase }
  }

  const pay = async () => {
    try {
      const { originDomain, originAsset, amount, xcallParams, sdkBase } = await initConnext()
      // Approve the asset transfer if the current allowance is lower than the amount.
      // Necessary because funds will first be sent to the Connext contract in xcall.
      const approveTxReq = await sdkBase.approveIfNeeded(
        originDomain,
        originAsset,
        amount
      )
      if (approveTxReq) {
        const approveTxReceipt = await signer?.sendTransaction(approveTxReq);
        await approveTxReceipt?.wait();
      }
      // Send the xcall
      const xcallTxReq = await sdkBase.xcall(xcallParams);
      // xcallTxReq.gasLimit = BigNumber.from("1000");
      const xcallTxReceipt = await signer?.sendTransaction(xcallTxReq);
      console.log(xcallTxReceipt);
      const r = await xcallTxReceipt?.wait();
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Layout>
      <PaymentInfoModal />
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Pay to {queryString.shop} With All0x Using Connext</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            Click the button to connect your wallet and pay
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >

          <ProductTab products={products ? products : []} />
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
            onClick={() => pay()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className=" h-4 w-4 group-hover:text-black"
              src="/All0xLogo.png"
              alt="Try Out All0x Payment Experience"
            />
            <p>Pay {buttonPrice}$</p>
          </a>
        </motion.div>
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
      </div>
    </Layout>
  );
}

