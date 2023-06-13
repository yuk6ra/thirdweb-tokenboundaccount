import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ERC721_ADDRESS } from "../const/constants";

const Home: NextPage = () => {

  const address = useAddress();


  return (
    <div className={styles.container}>
      <main className={styles.main}>

        <ConnectWallet />

        {!address ? (
          <p className="style.description">Connect your wallet to claim your NFT</p>
        ) : (
          <>
          <h3>NFT</h3>

          <NFTGrid />

            <Web3Button
              contractAddress={ERC721_ADDRESS}
              action={(contract) => contract.erc721.claim(1)}
            >Claim NFT</Web3Button>
          </>
        )}

      </main>
    </div>
  );
};

export default Home;
