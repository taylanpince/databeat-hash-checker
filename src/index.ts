import http from "http";
import { sha256 } from '@noble/hashes/sha256'
import { bytesToHex } from '@noble/hashes/utils'

const SEQ_SALT = "s3qs4lt";

const generateHashedAddress = (address: string) => {
    return bytesToHex(sha256(address.toLowerCase())).substring(0, 50);
}

const generateSaltedHashedAddress = (hash: string) => {
    const seed = `${hash}:${SEQ_SALT}`;
    return bytesToHex(sha256(seed)).substring(0, 50);
}

export const server = http.createServer((req, res) => {
    const universalAddress = "0xa2A7cD4302836767D194e2321E34B834494e0a28";
    const embeddedAddress = "0x0C65AdfF1e2dd19F14A06dc0a5Eb23bf34FD6938";
    const universalHash = "0713aff2656cc6d0cfebfefd44b8546710c7be153a08e92474";
    const embeddedHash = "12b71815ba9fa230ad8a16e91df10f7bf8545a9ceb9f93094e";
    const mehmetEmbeddedAddress = "0x5f21149eD1c4de522eB4414FC064f1DeF39f6c43";
    const mehmetEmbeddedHash = "8219a557a4a22bf19a97e39e56e2a4a5f2128731a5472390a3";

    const hashedUniversalAddress = generateSaltedHashedAddress(generateHashedAddress(universalAddress));
    const hashedEmbeddedAddress = generateSaltedHashedAddress(generateHashedAddress(embeddedAddress));
    const hashedMehmetEmbeddedAddress = generateSaltedHashedAddress(generateHashedAddress(mehmetEmbeddedAddress));

    const universalHashCorrect = hashedUniversalAddress === universalHash;
    const embeddedHashCorrect = hashedEmbeddedAddress === embeddedHash;
    const mehmetEmbeddedHashCorrect = hashedMehmetEmbeddedAddress === mehmetEmbeddedHash;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            universalAddress,
            embeddedAddress,
            mehmetEmbeddedAddress,
            universalHash,
            embeddedHash,
            mehmetEmbeddedHash,
            hashedUniversalAddress,
            hashedEmbeddedAddress,
            hashedMehmetEmbeddedAddress,
            universalHashCorrect,
            embeddedHashCorrect,
            mehmetEmbeddedHashCorrect
        })
    );
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
});
