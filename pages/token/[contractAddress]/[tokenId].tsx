import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ERC721_ADDRESS, activeChain } from "../../../const/constants";
import { GetStaticPaths, GetStaticProps } from "next";
import { ThirdwebNftMedia, useAddress, useWallet } from "@thirdweb-dev/react";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { Signer } from "ethers";

export const getStaticProps: GetStaticProps = async (context) => {

    const tokenId = context.params?.tokenId as string;

    const sdk = new ThirdwebSDK(activeChain);

    const contract = await sdk.getContract(ERC721_ADDRESS);

    const nft = await contract.erc721.get(tokenId);

    return {
        props: {
            nft,
        },
        revalidate: 1,
    }

}


export const getStaticPaths: GetStaticPaths = async () => {
    const sdk = new ThirdwebSDK(activeChain);

    const contract = await sdk.getContract(ERC721_ADDRESS);

    const nfts = await contract.erc721.getAll();

    const paths = nfts.map((nft) => {
        return {
            params: {
                contractAddress: ERC721_ADDRESS,
                tokenId: nft.metadata.id,
            }
        }
    });

    return {
        paths,
        fallback: "blocking",
    }

};


type Props = {
    nft: NFT;

}


const Token = ({ nft }: Props) => {

    const [smartWalletAddress, setSmartWalletAddress] = useState<string | undefined>(undefined);
    const [signer, setSigner] = useState<Signer>();
    const address = useAddress();
    const wallet = useWallet();


    useEffect(() => {

        const createSmartWallet = async () => {
            if (nft && smartWalletAddress == null && address && wallet) {
                const smartWallet = newSmartWallet(nft);
                await smartWallet.conect({
                    personalWallet: wallet
                })

                setSigner(await smartWallet.getSigner());
                setSmartWalletAddress(await smartWallet.getAddress());

                return smartWallet;
            } else {
                console.log("Wallet not created");
            }
        }

        createSmartWallet(nft);

    }, [nft, smartWalletAddress, address, wallet])

    return (
        <div className={styles.container}>

            <div>
                {nft && (
                    <>
                        <div>
                            <ThirdwebNftMedia
                                metadata={nft.metadata}
                            />
                            <h1>{nft.metadata.name}</h1>
                            <p>Token Id: {nft.metadata.id}</p>
                        </div>

                        <div>
                            {smartWalletAddress ? (
                                <SmartWalletConnected />
                            ): (
                                <p>Loading ... </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}


export default Token;