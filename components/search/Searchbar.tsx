"use client";

import Image from "next/image";
import React, { useState, FormEvent, useRef } from "react";
import { getDomainKeySync, NameRegistryState } from "@bonfida/spl-name-service";
import { Connection } from "@solana/web3.js";

const SHYFT_RPC = "https://rpc.shyft.to?api_key=hPg7Kx6w4aHXnozf";

const Searchbar = () => {
  let connection = new Connection(SHYFT_RPC); //get solana
  const [loading, setLoading] = useState<Boolean>(false);
  const [domain, setDomain] = useState<string>("");
  const [result, setResult] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { pubkey } = getDomainKeySync(domain); //public key

    try {
      const owner = (
        await NameRegistryState.retrieve(connection, pubkey)
      ).registry.owner.toBase58();

      const registryState = await NameRegistryState.retrieve(
        connection,
        pubkey
      );
      const data = registryState.registry.data;

      console.log(data);

      setLoading(false);
      setResult(owner);
    } catch (error) {
      console.error(error);
      setResult("");
    }
  }

  return (
    <div className="mx-auto flex md:gap-x-20 gap-y-8 items-center justify-around h-screen relative">
      <div className="-z-[1] opacity-100">
        <Image
          className="object-cover"
          src="/backgroundImage.jpg"
          alt="background image"
          fill={true}
        />
      </div>
      <div className="pt-2 mx-auto max-w-6xl text-gray-100 flex flex-col gap-y-5 justify-center items-center px-5 md:px-0">
        <h1 className="font-semibold text-2xl">Free SNS Appraisal</h1>
        <p className="font-normal text-lg text-center">
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
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            <>
              <div className="mx-auto transition-all gap-y-8 relative flex flex-col w-auto h-auto rounded-[10px] border-[1px] border-gray-200 bg-gray-800 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-gray-800 px-8 pt-8 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
                  <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                    Domain Info
                  </h4>
                </div>

                <div className="flex flex-col justify-start items-start px-8 pb-8 gap-y-5">
                  <div className="flex flex-col flex-wrap gap-2">
                    <div className="text-xl font-semibold">Owner</div>
                    <div className="break-all">
                      {result
                        ? String(result)
                        : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 items-start">
                    <div className="text-xl font-semibold">Domain (.sol)</div>
                    <div>{domain ? domain : "No domain name"}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <div className="text-xl font-semibold">Value</div>
                    <div className="space-y-3">
                      approx. $400
                      <p className="text-xs italic font-mono mt-4">
                        the .sol value is estimated not actual
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
