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
import NftAbi from "../src/nftAbi.json";
import styles from "../styles/Home.module.css";

interface Itype {
  address: Address;
  abi: any;
}

const CreateToken: NextPage = () => {
  const { address } = useAccount();

  const nftContract: Itype = {
    address: "0x5c8FED6aa167D304032639E0d62f5fB44e7fF18A",
    abi: NftAbi,
  };

  const [tokenURI, setTokenURI] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    write?.();
    alert("Successful");
  };

  const { config } = usePrepareContractWrite({
    ...nftContract,
    functionName: "createToken",
    args: [tokenURI],
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
    <div className="mb-[5rem]">
      <Head>
        <title>NFT Market Place | Create NFTs</title>
        <meta content="A Simple NFT Market Place Dapp" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="flex justify-center items-center flex-col mt-[3rem]">
        <h1 className="text-2xl font-semibold">Create NFT</h1>
        <form
          onSubmit={handleSubmit}
          className={`${styles.card} flex flex-col justify-center`}
        >
          <div>
            <label>Token URI: </label>
            <input
              className="ring-1 ring-blue-800 rounded-lg p-2"
              type="text"
              placeholder="Input Token URI (CID) Here"
              onChange={(e: HTMLInputElement) => setTokenURI(e.target.value)}
            />{" "}
          </div>
          <br />
          <button type="submit" className="mt-3 bg-blue-800 p-3 rounded-lg text-white">
            {writeLoading || waitLoading ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateToken;
