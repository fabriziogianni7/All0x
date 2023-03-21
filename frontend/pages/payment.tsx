import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { Web3Context } from "context";
import ProductTab from "@/components/shared/product-tab";
import { ethers } from "ethers";

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
  // {
  //   name: "prodB",
  //   quantity: 1,
  //   price: 7.50,
  //   prodId: "prodIdRand1235"
  // },
  // {
  //   name: "prodc",
  //   quantity: 1,
  //   price: 1,
  //   prodId: "prodIdRand1236"
  // }
]
export default function Payment() {
  const { initLedgerTestContract } = useContext(Web3Context)
  let ledger: any = useRef();
  const [buttonPrice, setButtonPrice] = useState<number>(0)



  useEffect(() => {
    const price = prods.reduce((acc: number, p: ProductToBuy) => acc += p.price, 0)
    setButtonPrice(price)

  })

  const initLedger = async () => {
    try {
      
      ledger = await initLedgerTestContract()
      ledger.on("TxRecorded", (owner:any , transactionNumber:any,)=>{
        let transferEvent ={
            owner,
            transactionNumber,
        }
        console.log(JSON.stringify(transferEvent, null, 4))
        alert(JSON.stringify(transferEvent))
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
      const options = { value: ethers.parseEther(amount) }
      const transaction = await ledger?.recordTransaction(
        "cust123frontend",
        [1, 2, 3],
        options)
  
  
      console.log("transaction", transaction)
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

  //TODO alert when transaction is executed



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
        <motion.a
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
        </motion.a>
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Pay With All0x</Balancer>
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

          <ProductTab products={prods} />
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
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

