import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "../src/layouts/PageLayout";
import styles from "../styles/Home.module.css";
import NftAbi from "../src/nftAbi.json";
import MarketPlaceABI from "../src/nftMktAbi.json";
import {
  Address,
  useAccount,
  useContractRead,
  useContractReads,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import Link from "next/link";

interface Itype {
  address: Address;
  abi: any;
}
const Home: NextPage = () => {
  const { address } = useAccount();

  const marketPlaceContract: Itype = {
    address: "0x2E59681c8128707e9fab33Bac1e16891403C1921",
    abi: MarketPlaceABI,
  };

  const nftContract: Itype = {
    address: "0x5c8FED6aa167D304032639E0d62f5fB44e7fF18A",
    abi: NftAbi,
  };

  const { data: fetchItemsListedData, isLoading: fetchLoading }: any =
    useContractReads({
      contracts: [
        {
          ...nftContract,
          functionName: "name",
        },
        {
          ...nftContract,
          functionName: "symbol",
        },
        {
          ...nftContract,
          functionName: "balanceOf",
          args: [address ?? "0x0"],
        },
        {
          ...marketPlaceContract,
          functionName: "fetchMarketItems",
        },
        {
          ...marketPlaceContract,
          functionName: "listingPrice",
        },
      ],
    });

  console.log(String(fetchItemsListedData?.[3]));

  return (
    <div className="flex flex-col justify-center items-center">
      <Head>
        <title>NFT Market Place | Home</title>
        <meta content="A Simple NFT Market Place Dapp" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="flex justify-between gap-8 border-b-1 mt-5 font-mono">
        <div>
          <div>Address: {address}</div>
          <div>Name of Token: {fetchItemsListedData?.[0]}</div>
        </div>
        <div>
          <div>
            Balance: {String(fetchItemsListedData?.[2])}-
            {fetchItemsListedData?.[1]}
          </div>
          <div>Listing Price: {fetchItemsListedData?.[4] / 10 ** 18} ETH</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-[2rem]">
        <h1 className="text-2xl font-semibold mb-[2rem]">Featured Listings</h1>
        {/* <div>{String(fetchItemsListedData?.[3]?.[0][1])}</div> */}
        <div className="grid grid-cols-2 gap-[3rem] place-items-center mb-[2rem]">
          {fetchLoading ? (
            <>...NFTs Currently Loading...</>
          ) : (
            fetchItemsListedData?.[3]?.map((data: any, i: number) => {
              return (
                <Link href={`/${data[0]}`} key={data[i]}>
                  <div className="ring-2 ring-blue-800 rounded-lg p-8 shadow-2xl">
                    <p>Seller: {data[3]}</p>
                    <p>Token ID: {String(data[2])}</p>
                    <p>Price: {String(data[5])} ETH</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
        <button className="rounded-lg py-8 px-10 bg-blue-900 text-white m-3 text-xl">
          <Link href="/listItems">List Your NFTs Here</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
