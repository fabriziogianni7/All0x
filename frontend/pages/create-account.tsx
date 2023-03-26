import * as Label from '@radix-ui/react-label';
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
import { GOERLI_ORIGIN_ASSET, LEDGER_FACTORY_CONTRACT, LEDGER_FACTORY_CONTRACT_ABI, LEDGER_TEST_CONTRACT } from "context/constants";
import { create, SdkConfig } from "@connext/sdk";
import { useRouter } from 'next/router'
import { CodePanel } from '@/components/shared/code-panel';


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


export default function CreateAccount(): JSX.Element {
  const { connectSigner, account, signer } = useContext(Web3Context)
  const [merchantName, setMerchantName] = useState<string>("")
  const [merchantAddress, setMerchantAddress] = useState<string>("")

  useEffect(() => {

  }, [])

  const createLedger = async (name?: string) => {
    try {
      console.log("hwre", merchantName)
      if (!account) connectSigner()
      if (!merchantName) alert("you need to insert a name")
      const ledgerFacotry = initLedgerFactoryContract()
      const newLedger = await ledgerFacotry.createLedger(merchantName, GOERLI_ORIGIN_ASSET)
      console.log("newLedger", newLedger)


    } catch (error) {
      console.log(error)
    }
  }
  const initLedgerFactoryContract = (name?: string) => {
    if (!account) connectSigner()
    const ledgerFacotry = new ethers.Contract(LEDGER_FACTORY_CONTRACT, LEDGER_FACTORY_CONTRACT_ABI, signer)
    console.log("ledgerFacotry", ledgerFacotry)

    const filters = ledgerFacotry.filters.LedgerCreated(account)
    ledgerFacotry.on(filters, (address: any) => {
      alert(`Ledger is created successfully,
        use this address ${address} in the button to start using All0x in your commerce:`)
      setMerchantAddress(address)
    })
    return ledgerFacotry
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
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Create a new All0x Account</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            Just insert your commerce name and click the button.
          </Balancer>
          <Balancer>
            Once the account creation is successful,
            you will see a code snippet with a the code you can copypaste in your website.
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >

        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Label.Root className="LabelRoot text-md font-medium leading-9" htmlFor="comemrce-name">
            Name
          </Label.Root>
          <input type="text" className="Input w-56 inline-flex items-center justify-center rounded-md px-4 h-9 text-lg text-grey bg-blackA5 shadow-md focus:outline-none focus:ring-2 focus:ring-blackA9" id="comemrce-name" onChange={(e: any) => {
            setMerchantName(e.target.value)
          }
          } />
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Label.Root className="LabelRoot text-md font-medium leading-9" htmlFor="comemrce-token">
            Token
          </Label.Root>
          <input type="text" className="Input w-56 inline-flex items-center justify-center rounded-md px-4 h-9 text-lg text-grey bg-blackA5 shadow-md focus:outline-none focus:ring-2 focus:ring-blackA9" id="comemrce-token" defaultValue="GOERLI_TEST" disabled
          />
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
            onClick={() => createLedger()}
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
            <p>Create All0x Account</p>
          </a>
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <CodePanel address={merchantAddress} shopName={merchantName} />
        </motion.div>
      </motion.div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
      </div>
    </Layout>
  );
}

