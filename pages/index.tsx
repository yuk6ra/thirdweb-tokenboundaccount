import { ConnectWallet, Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ERC721_ADDRESS } from "../const/constants";
import NFTGrid from "../components/NFTGrid";

const Home: NextPage = () => {

    const address = useAddress();

    const { contract } = useContract(ERC721_ADDRESS);

    const { 
        data,
        isLoading,
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <main className={styles.main}>

                <ConnectWallet />

                {!address ? (
                    <p className="style.description">Connect your wallet to claim your NFT</p>
                ) : (
                    <>
                        <h3>NFT</h3>

                        <NFTGrid
                            isLoading={isLoading}
                            nfts={data}
                            emptyText="No NFTs found"
                        />

                        <Web3Button
                            contractAddress={ERC721_ADDRESS}
                            action={async (contract) => await contract.erc721.claim(1)}
                        >Claim NFT</Web3Button>
                    </>
                )}

            </main>
        </div>
    );
};

export default Home;
