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
import { ethers } from "ethers";
import { LEDGER_TEST_CONTRACT } from "context/constants";
import { create, SdkConfig } from "@connext/sdk";
import { useRouter } from 'next/router'


export type ProductToBuy = {
  name: string,
  quantity: number
  price: number
  prodId: string
}


const prods: ProductToBuy[] = [
  {
    name: "prodA",
    quantity: 1,
    price: 0,
    prodId: "prodIdRand1234"
  },
  {
    name: "prodB",
    quantity: 1,
    price: 0,
    prodId: "prodIdRand1234"
  }
]

/**
 * @FLOW this component should have all necessary element in the url
 * eleme nts:
 * merchant network id 
 * merchant ledger address
 * prod data
 * need this to format the prods in the button :
 * encodeURIComponent(JSON.stringify(prods).replace(/"([^"]+)":/g, '$1:'))
 * testURL: 
 * http://localhost:3000/payment/0x61bAfaDB21adF54D1f9BfBA92d2E463b042894eF?shop=xyzShop&networkId=80001&prods=%5B%7B%22name%22%3A%22prodA%22%2C%22quantity%22%3A1%2C%22price%22%3A5%2C%22prodId%22%3A%22prodIdRand1234%22%7D%2C%7B%22name%22%3A%22prodB%22%2C%22quantity%22%3A1%2C%22price%22%3A5%2C%22prodId%22%3A%22prodIdRand1234%22%7D%5D
 * 
 * http://localhost:3000/payment/0x61bAfaDB21adF54D1f9BfBA92d2E463b042894eF?%7B%22shop%22%3A%22xyzShop%22%2C%22network%22%3A%2280001%22%7D&%5B%7Bname%3A%22prodA%22%2Cquantity%3A1%2Cprice%3A0%2CprodId%3A%22prodIdRand1234%22%7D%2C%7Bname%3A%22prodB%22%2Cquantity%3A1%2Cprice%3A0%2CprodId%3A%22prodIdRand1234%22%7D%5D
 * 
 */
export default function Payment(): JSX.Element {
  const { initLedgerTestContract, account } = useContext(Web3Context)
  let ledger: any = useRef();
  const [buttonPrice, setButtonPrice] = useState<number>(0)
  const [_ledger, _setLedger] = useState<any>()
  const [products, setProds] = useState<any>()
  const router = useRouter()
  const queryString = router.query



  useEffect(() => {

    console.log(encodeURIComponent(JSON.stringify(prods)))

    if (queryString?.prods) {
      const decod = decodeURIComponent(queryString?.prods as string)
      const prodsDecoded = JSON.parse(decod) as ProductToBuy[]
      setProds(prodsDecoded)
      const price = prodsDecoded.reduce((acc: number, p: ProductToBuy) => acc += p.price, 0)
      setButtonPrice(price)
    }

  }, [_ledger, queryString])



  /**
   * @FLOW  this function should do direct calls to the contract if who is paying has the same network of the merchant otherwise should use connext
   */
  const initLedger = async () => {

    try {
      // if (false) { //I KNOW! testing xcalls
      ledger = await initLedgerTestContract(queryString.merchant as string)
      console.log("ledger:", ledger)
      _setLedger(ledger)

      const filters = ledger.filters.TxRecorded(account)
      ledger.on(filters, (owner: any) => {
        alert(`Payment successful,
        * TODO: make a nice modal here!`)
      })

    } catch (error) {
      console.log(error)
    }
  }

  const pay = async () => {
    try {
      const totalAmount: string = await calculateTotalPrice()
      const tx = await recordTransaction(totalAmount)
      console.log("transaction", tx)
    } catch (error) {
      console.log(error)
    }
  }

  // call contract. recordtransaction
  const recordTransaction = async (amount: string) => {

    if (!ledger?.current) await initLedger()


    try {
      const options = { value: ethers.utils.parseEther(amount) }
      const transaction = await ledger?.recordTransaction(
        "cust123frontend",
        [1, 2, 3],
        options)




      // console.log("transaction", transaction)
      return transaction
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * TODO calculate total price
   * should I do it in dollars /euro?
   * should I do with token selected?
   * maybe I can just see the price of the native token of the network selected
   * maybe the pay button should open a modal where user can choose between the networks
   * then I can calculate how much should the user pay converting the price to the total amount of native token
   */
  const calculateTotalPrice = async () => {
    // TODO Implement
    return buttonPrice.toString()
  }

  return (
    <Layout>
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
        {/* <motion.a
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          // href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        // onClick={()=>initLedgerTestContract()}
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            get Ledger contract
          </p>
        </motion.a> */}
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Pay to {queryString.shop} With All0x</Balancer>
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
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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

