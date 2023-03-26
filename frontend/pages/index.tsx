import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Link from 'next/link'
import { PAYMENT_EXPERIENCE_URL } from "context/constants";

export default function Home() {
  return (
    <Layout>
      <motion.div
        // style={{
        //   backgroundImage: "url('/All0xLogo.png')"
        // }}
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
          href="https://twitter.com/steventey/status/1613928948915920896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            visit developer profile
          </p>
        </motion.a> */}
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Easily integrate crypto in your e-commerce</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            All0x enhance commerces all araound the world to accept crypto.
          </Balancer>
          <Balancer>
            People can spend whatever token in whatever wallet in whatever blockchain.
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <a href={PAYMENT_EXPERIENCE_URL} className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
            target="_blank"
            rel="noopener noreferrer">
            <img
              className=" h-4 w-4 group-hover:text-black"
              src="/All0xLogo.png"
              alt="Try Out All0x Payment Experience"
            />
            <p>Try All0x With Connext</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="/create-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className=" h-4 w-4 group-hover:text-black"
              src="/All0xLogo.png"
              alt="Try Out All0x Payment Experience"
            />
            {/* <Github /> */}
            <p>Create All0x Account </p>
          </a>
        </motion.div>
        <motion.div
          className="mx-auto mt-6 flex items-center justify-center space-x-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {/* <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="/create-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>Get your account data</p>
          </a> */}
        </motion.div>
      </motion.div>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-2 xl:px-0 ">
        {features.map(({ title, description, demo }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Register as a merchant" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
          // large={large}
          />
        ))}
      </div>
    </Layout>
  );
}

const features = [
  // {
  //   title: "Register as a merchant",
  //   description:
  //     "Using all0x is very easy, just create a profile and embed a js button in your e-commerce",
  //   large: true,
  // },
  // {
  //   title: "Blockchains Natively Supported",
  //   description:
  //     "Deployed on xyz chains",
  //   demo: <WebVitals value={15} />,
  // },
  {
    title: "Cross-Chains enabled thanks to Connext",
    description:
      "Built on Connext to enable cross-chain payments.",
    demo: <WebVitals value={4} />,
  },
  {
    title: "Transactions Made with All0x",
    description:
      "Pay everywhere with any stablecoins",
    demo: <WebVitals value={200} />,
  },
  // {
  //   title: "One-click Deploy",
  //   description:
  //     "Jumpstart your next project by deploying All0x to [Vercel](https://vercel.com/) in one click.",
  //   demo: (
  //     <a href={DEPLOY_URL}>
  //       {/* eslint-disable-next-line @next/next/no-img-element */}
  //       <img
  //         src="https://vercel.com/button"
  //         alt="Deploy with Vercel"
  //         width={120}
  //       />
  //     </a>
  //   ),
  // },
  // {
  //   title: "Built-in Auth + Database",
  //   description:
  //     "All0x comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
  //   demo: (
  //     <div className="flex items-center justify-center space-x-20">
  //       <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
  //       <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
  //     </div>
  //   ),
  // },
  // {
  //   title: "Hooks, utilities, and more",
  //   description:
  //     "All0x offers a collection of hooks, utilities, and `@vercel/og`",
  //   demo: (
  //     <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
  //       <span className="font-mono font-semibold">useIntersectionObserver</span>
  //       <span className="font-mono font-semibold">useLocalStorage</span>
  //       <span className="font-mono font-semibold">useScroll</span>
  //       <span className="font-mono font-semibold">nFormatter</span>
  //       <span className="font-mono font-semibold">capitalize</span>
  //       <span className="font-mono font-semibold">truncate</span>
  //     </div>
  //   ),
  // },
];
