import { ethers } from "ethers";
import { id } from "ethers/lib/utils.js";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import {
  Address,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import MarketPlaceABI from "../src/nftMktAbi.json";
import styles from "../styles/Home.module.css";

interface Itype {
  address: Address;
  abi: any;
}

const Nft: NextPage = () => {
  const [tokenDetails, setTokenDetails] = useState([]);

  const { id } = useRouter().query;
  const _id = Number(id) - 1;
  console.log(id);

  const {
    data: readData,
    isError,
    isLoading,
  }: any = useContractRead({
    address: "0x2E59681c8128707e9fab33Bac1e16891403C1921",
    abi: MarketPlaceABI,
    functionName: "fetchMarketItems",
    // args: [id],
    onSuccess(readData: any) {
      setTokenDetails(readData);
    },
  });

  const price: any = (tokenDetails?.[_id]?.[5]);

  const { config } = usePrepareContractWrite({
    address: "0x2E59681c8128707e9fab33Bac1e16891403C1921",
    abi: MarketPlaceABI,
    functionName: "buyAsset",
    args: [
      "0x5c8FED6aa167D304032639E0d62f5fB44e7fF18A",
      tokenDetails?.[_id]?.[0],
    ],
    // overrides: {
    //   value: ethers.utils.parseEther(price)?.toString(),
    // },
  });

  const {
    data: writeData,
    isLoading: writeLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  const {
    data,
    isError: e,
    isLoading: waitLoading,
  } = useWaitForTransaction({
    hash: writeData?.hash,

    onSuccess(data) {
      console.log("SUCCESS: ", data);
    },

    onError(error) {
      console.log("ERROR: ", error);
    },
  });

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    write?.();
    alert("Successful");
  };

  console.log(data);

  return (
    <div>
      <Head>
        <title>NFT Market Place | Home</title>
        <meta content="A Simple NFT Market Place Dapp" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="flex flex-col justify-center items-center mt-3">
        <h1 className="text-2xl font-semibold">NFT Information</h1>
        {isLoading ? (
          <>...NFT Information Currently Loading...</>
        ) : (
          <div className="">
            <div
              className={`${styles.card} p-3 shadow-2xl flex flex-col justify-center`}
            >
              <p>Item ID: {String(tokenDetails[_id])[0]}</p>
              <p>NFT Contract Address: {tokenDetails?.[_id]?.[1]}</p>
              <p>Token ID: {String(tokenDetails[_id])[2]}</p>
              <p>Seller Address: {tokenDetails?.[_id]?.[3]}</p>
              <p>Owner: {tokenDetails?.[_id]?.[4]}</p>
              <p>Price: {tokenDetails?.[_id]?.[5] / 1 ** 18} ETH</p>
              <button
                onClick={handleClick}
                className="my-3 p-3 bg-blue-800 rounded-lg text-white"
              >
                <Link href="">BUY</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nft;
