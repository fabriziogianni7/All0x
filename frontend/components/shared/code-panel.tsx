// import { Button, Panel, Text } from '@radix-ui/bu';
// import { CodeIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { motion } from "framer-motion";

export const CodePanel = (props: { address: string, shopName:string }) => {
    // function CodePanel({ code }) {
    const [copied, setCopied] = useState(false);

    const handleInputClick = (e: any) => {
        copy(e.target.value);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
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
            {/* <a> */}

                <textarea
                    className="bg-gray-900 text-white font-mono text-sm rounded-lg px-2 py-4 border border-gray-700 w-[600px] h-[200px] resize-none text-left leading-tight"
                    // type="textarea"
                    id="firstName"
                    readOnly

                    value={`<button onclick="()=> {
    var products = encodeURIComponent(JSON.stringify(productsArray)) // pass in the products info
    var url = "http://localhost:3000/payment/${props.address? props.address : "YOUR_LEDGER_ADDRESS_HERE"}?shop=${props.shopName? props.shopName : "YOUR_SHOP_NAME_HERE"}&networkId=80001&prods=" + products
    window.open(url, "_blank");
    }">Pay With All0x</button>
    `}
                    onClick={handleInputClick}
                />
                <a className="absolute bottom-4 left-4 p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200"
                    onClick={handleInputClick}>

                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 7l-3 3m0 0l-3-3m3 3v8"
                        />
                    </svg>
                </a>
            {/* </a> */}
            {copied && (
                <div className="absolute inset-y-40 right-10 flex pr-1">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="ml-1 text-sm font-medium text-green-500">Copied!</p>
                </div>
            )}


            {/* </input> */}


        </motion.div>
    );
}
