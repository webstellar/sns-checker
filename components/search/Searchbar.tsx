"use client";

import Image from "next/image";
import React, { useState, FormEvent, useRef } from "react";
import {
  getDomainKeySync,
  NameRegistryState,
  getPicRecord,
} from "@bonfida/spl-name-service";
import { Connection } from "@solana/web3.js";

const SHYFT_RPC = "https://rpc.shyft.to?api_key=hPg7Kx6w4aHXnozf";

const Searchbar = () => {
  let connection = new Connection(SHYFT_RPC); //get solana
  const [domain, setDomain] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { pubkey } = getDomainKeySync(domain); //public key

    try {
      const owner = (
        await NameRegistryState.retrieve(connection, pubkey)
      ).registry.owner.toBase58();
      setResult(owner);
    } catch (error) {
      console.error(error);
      setResult("");
    }

    //const profilePicture = await getPicRecord(connection, pubkey.toBase58());
    /*
    if (!registry.data) {
      return setPics(""); // Provide a default value for setPics state variable
    }

    if (mounted.current) {
      setPics(profilePicture?.data?.toString("utf-8"));
    }
    return () => (mounted.current = false);
*/

    //console.log(profilePicture);
  }

  return (
    <div className="mx-auto flex gap-x-20 gap-y-8 items-center justify-around h-screen relative">
      <div className="-z-[1] opacity-100">
        <Image
          className="object-cover"
          src="/backgroundImage.jpg"
          alt="background image"
          fill={true}
        />
      </div>
      <div className="pt-2 mx-auto max-w-6xl text-gray-100 flex flex-col gap-y-5 justify-center items-center">
        <h1 className="font-semibold text-2xl">Free SNS Appraisal</h1>
        <p className="font-normal text-lg">
          Use our free valuator tool to determine a domain value…
        </p>
        <form onSubmit={onSubmit}>
          <div className="relative w-full">
            <input
              type="search"
              name="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full md:w-[500px] backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
              placeholder="Enter a domain name"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </form>

        <div className="flex flex-col justify-center items-center">
          {result ? (
            <div className="gap-y-14 relative flex max-w-[500px] h-[360px] w-full md:w-[500px] flex-col rounded-[10px] border-[1px] border-gray-200 bg-gray-800 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-gray-800 px-4 pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
                <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                  Domain Info
                </h4>
              </div>

              <div className="flex flex-col justify-start items-start px-4 gap-y-5">
                <div className="flex flex-col gap-1 items-start">
                  <div className="text-xl font-semibold">Owner</div>
                  <div>{result}</div>
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <div className="text-xl font-semibold">Domain (.sol)</div>
                  <div>{result && domain}</div>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <div className="text-xl font-semibold">Value</div>
                  <div> {result && "$400"}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white text-center">
              {result && "Not result found!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
