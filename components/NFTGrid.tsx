import { NFT as NFTType } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { ERC721_ADDRESS } from "../const/constants";
import NFTComponent from "./NFT";

type Props = {
    isLoading: boolean;
    nfts: NFTType[] | undefined;
    emptyText?: string;
}

const NFTGrid = ({ isLoading, nfts, emptyText }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {nfts && nfts.length > 0 ? (
                    nfts.map((nft) => (
                        <Link
                            key={nft.metadata.id}
                            href={`/token/${ERC721_ADDRESS}/${nft.metadata.id}`}
                            className={styles.card}
                        >
                            <NFTComponent nft={nft} />
                        </Link>
                    ))
                ) : (
                    <>
                        { emptyText }

                    </>
            )}
            </div>
        </div>
    )

}

export default NFTGrid;