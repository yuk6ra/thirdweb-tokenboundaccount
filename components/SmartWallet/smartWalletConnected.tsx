import {
    ThirdwebSDKProvider,
    useAddress,
    useBalance,
    Web3Button,
    useOwnedNFTs,
    useContract,
    ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import React from "react";
import { Signer } from "ethers";
import styles from "../../styles/Home.module.css";
import {
    TWAPI_KEY,
    FACTORY_ADDRESS,
    activeChain,
    ERC721_ADDRESS,
    ERC20_ADDRESS,
    IMPLEMENATION_ADDRESS,
    ERC1155_ADDRESS,
} from "../../const/constants";

interface ConnectedProps {
    signer: Signer | undefined;
}

// ThirdwebSDKProvider is a wrapper component that provides the smart wallet signer and active chain to the Thirdweb SDK.
const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
    return (
        <ThirdwebSDKProvider signer={signer} activeChain={activeChain}>
            <ClaimTokens />
        </ThirdwebSDKProvider>
    );
};

// This is the main component that shows the user's token bound smart wallet.
const ClaimTokens = () => {
    const address = useAddress();
    const {
        data: tokenBalance,
        isLoading: balanceIsLoading,
    } = useBalance(ERC20_ADDRESS);

    const {
        contract
    } = useContract(ERC1155_ADDRESS);

    const {
        data: ownedNFTs,
        isLoading: editionIsLoading,
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.walletContainer}>
            <p>Smart Wallet Address: {address}</p>
            <h1 className={styles.title}>Claim ERC20</h1>
            {balanceIsLoading ? (
                <h2>Loading Balance...</h2>
            ) : (
                <h2>Balance: {tokenBalance?.displayValue}</h2>
            )}

            <Web3Button
                contractAddress={ERC20_ADDRESS}
                action={async (contract) => await contract.erc20.claim(10)}
            >
                Claim 10 Tokens
            </Web3Button>

            <h1 className={styles.title}>Claim ERC1155</h1>

            {editionIsLoading ? (
                <h2>Loading edition...</h2>
            ) : (
                <div>
                    {ownedNFTs && ownedNFTs.length > 0 ? (
                        ownedNFTs.map((nft) => (
                            <div key={nft.metadata.id}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                />
                                <p>Edition Name: {nft.metadata.name}</p>
                                <p>Quantity: {nft.quantityOwned}</p>
                            </div>
                        ))
                    ) : (
                        <p>You have no NFTs</p>
                    )}
                </div>
            )}

            <Web3Button
                contractAddress={ERC1155_ADDRESS}
                action={async (contract) => await contract.erc1155.claim(0, 1)}
            >
                Claim 1 Tokens
            </Web3Button>
        </div>
    );
};

export default SmartWalletConnected;