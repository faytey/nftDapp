import { ethers } from "ethers";
import { NextPage } from "next";
import Head from "next/head";
import React, { SyntheticEvent, useState } from "react";
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// import NftAbi from "../src/nftAbi.json";
import MarketPlaceABI from "../src/nftMktAbi.json";
import styles from "../styles/Home.module.css";

interface Itype {
  address: Address;
  abi: any;
}
const ListItems: NextPage = () => {
  const { address } = useAccount();

  const marketPlaceContract: Itype = {
    address: "0x2E59681c8128707e9fab33Bac1e16891403C1921",
    abi: MarketPlaceABI,
  };

  //   const nftContracts: any = {
  //     address: "0x5c8FED6aa167D304032639E0d62f5fB44e7fF18A",
  //     abi: NftAbi,
  //   };

  const [nftContract, setNftContract] = useState("");
  const [tokenId, setTokenId] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    write?.();
    console.log("Successful");
  };

  const { config } = usePrepareContractWrite({
    ...marketPlaceContract,
    functionName: "ListItemForSale",
    args: ["0x5c8FED6aa167D304032639E0d62f5fB44e7fF18A", tokenId, price],
    overrides: {
      value: ethers.utils.parseEther("0.00067"),
    },
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

  return (
    <div>
      <Head>
        <title>NFT Market Place | List NFTs</title>
        <meta content="A Simple NFT Market Place Dapp" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="flex justify-center items-center flex-col mt-[3rem]">
        <form
          onSubmit={handleSubmit}
          className={`${styles.card} flex flex-col justify-center`}
        >
          <h1 className="text-2xl font-semibold">List Your NFT</h1>
          <div className="mt-3">
            <label>NFT ID: </label>
            <div className="ring-1 ring-blue-800 rounded-lg p-2 m-3">
              <input
                type="number"
                placeholder="Input NFT ID Here"
                onChange={(e: HTMLInputElement) => setTokenId(e.target.value)}
              />
            </div>{" "}
            <br />
          </div>
          <div>
            <label>Price: </label>
            <div className="ring-1 ring-blue-800 rounded-lg p-2 m-3">
              <input
                type="number"
                placeholder="Input Price of your NFT Here"
                onChange={(e: HTMLInputElement) => setPrice(e.target.value)}
              />
            </div>{" "}
            <br />
          </div>
          <button
            type="submit"
            className="m-3 bg-blue-800 rounded-lg text-white p-3"
          >
            {writeLoading || waitLoading ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListItems;
