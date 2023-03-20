import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

import { useContext } from 'react';
import { Web3Context } from '../../context/index';

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const { account, connectSigner } = useContext(Web3Context);

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <div className="fixed h-screen h-full w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${scrolled
          ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
          : "bg-white/0"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="All0x logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>All0x</p>
          </Link>
          <div>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => connectSigner()}
                  // onClick={() => connectSigner()}
                  // setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  {
                    account ? account : "Connect Wallet"
                  }
                  {/* Sign In  */}
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-full flex-col items-center justify-center py-32 ">
        {children}
      </main>
      <div className="relative bottom-0 w-full border-t border-gray-200 bg-white p-12 text-center  ">
        <p className="text-gray-500">
          Developed For Scaling Ethereum ETHGlobal Hackathon{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://github.com/fabriziogianni7"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Fabriziogianni7
          </a>
        </p>
      </div>
    </>
  );
}
