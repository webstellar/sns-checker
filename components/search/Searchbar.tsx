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
  const [pic, setPics] = useState<string>("");
  const mounted = useRef(true);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { pubkey } = getDomainKeySync(domain); //public key
    console.log("pubkey: " + pubkey);

    const { registry, nftOwner } = await NameRegistryState.retrieve(
      connection,
      pubkey
    );

    const owner = (
      await NameRegistryState.retrieve(connection, pubkey)
    ).registry.owner.toBase58();

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

    setResult(owner);
    console.log(registry);
    console.log(nftOwner);
    //console.log(profilePicture);
  }

  return (
    <div className="mx-auto flex gap-x-20 gap-y-8 items-center justify-around h-screen relative">
      <div className="-z-[1] opacity-100">
        <Image
          className="object-cover"
          src="/herobackgroundImage.jpg"
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

        {result && (
          <div className="flex flex-col justify-center items-center">
            <div className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-gray-800 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-gray-800 px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                  Domain Info
                </h4>
                <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                  See more
                </button>
              </div>
              <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
                <table
                  role="table"
                  className="w-full min-w-[500px] overflow-x-scroll"
                >
                  <thead>
                    <tr role="row">
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                          Owner
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                          Domain (.sol)
                        </div>
                      </th>
                      <th
                        colSpan={1}
                        role="columnheader"
                        title="Toggle SortBy"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                          Value
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup" className="px-4">
                    <tr role="row">
                      <td
                        className="py-3 pr-4 text-sm break-all align-top"
                        role="cell"
                        width="50%"
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {result}
                          </p>
                        </div>
                      </td>
                      <td
                        className="py-3 pr-4 text-sm break-all align-top"
                        role="cell"
                        width="30%"
                      >
                        <p className="text-md font-medium text-gray-600 dark:text-white">
                          {result && domain}
                        </p>
                      </td>
                      <td
                        className="py-3 pr-2 text-sm align-top"
                        role="cell"
                        width="20%"
                      >
                        <div className="mx-2 flex font-bold">
                          <div
                            className="flex h-full items-center justify-center rounded-md bg-brand-500 dark:bg-brand-400"
                            style={{ width: "30%" }}
                          >
                            {result && $400}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
