/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import { mintArgs, serverMint } from "./serverMint";
import { Loading } from "@/components/Loading";

import { useRouter } from 'next/navigation'
import { WALLET_DEEP_LINK } from "./constants";


export default function Minter() {
    const [txLoading, setTxLoading] = useState(false);
    const router = useRouter();


    const handleServerMint = () => {
        setTxLoading(true);
        serverMint()
    }

    const handleClientMint = async () => {
        setTxLoading(true);
        const mintParams = await mintArgs("");
        const action = { type: "FunctionCall", params: mintParams }
        const txArgs = JSON.stringify({ receiverId: "1.minsta.mintbus.near", actions: [action] })
        router.push(`${WALLET_DEEP_LINK}[${txArgs}]`)
    }
    if (txLoading) return <Loading />

    return (
        <>
            <div className="text-center">
                <h1 className="text-black text-2xl font-medium">Claim free token!</h1>
                <div className="mt-4">
                    <img
                        src="https://24njbleuvrkggjnr6s3pk473n4jc3buhmy3gnrtfms7jueolq6gq.arweave.net/1xqQrJSsVGMlsfS29XP7bxIthodmNmbGZWS-mhHLh40"
                        alt=""
                        className="w-full max-w-sm mx-auto"
                    />
                </div>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleClientMint}
                    className="bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-full max-w-sm mx-auto"
                >
                    Mint
                </button>
                <button onClick={handleServerMint} className="text-blue-600 mt-4 hover:bg-[#e1e1e1]">Drop to a new wallet</button>
            </div >
        </>
    );
}
