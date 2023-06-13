import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

type Props = {
    nft: NFT;
}

const NFTComponent = ({ nft }: Props) => {

    return (
        <>
            <ThirdwebNftMedia
                metadata = {nft.metadata}
            />
            <p>Token Id: {nft.metadata.id}</p>
            <p>{nft.metadata.name}</p>
        </>
    )

}

export default NFTComponent;
