import { useState, useEffect } from 'react'
import axios from 'axios'

const NFTScreen = () => {

    const [nftData, setNftData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [address, setAddress] = useState('0x6519F68ca26C7F59DEEabce7194dA4d14e1F2847')
    // const [address, setAddress] = useState('Gg4h7ty3zLk488GSc4aUrDj9hiHNn58hmBkjSjBEiY9r')
    const [address, setAddress] = useState(null)

    const ethBaseURL = "https://yolo-misty-yard.discover.quiknode.pro/2c41c63dcd6292db134c6874285a6f941abafbf1/"
    const solanaBaseURL = "https://white-autumn-yard.solana-mainnet.discover.quiknode.pro/98db0441bb955ebc11a2a5d4933b8c335939de7d/"

    const getNFTData = async () => {
        try {
            setLoading(true)

            if(address.length === 42) {
                const response = await axios.post(ethBaseURL, {
                    id: 67,
                    jsonrpc: "2.0",
                    method: "qn_fetchNFTs",
                    params: {
                        "wallet": address,
                        "omitFields": [
                            "provenance"
                        ],
                        "page": 1,
                        "perPage": 40
                    }
                })
                console.log(response)
                const data = response.data
                console.log(data)
                const result = data.result
                const assets = result?.assets
                setNftData(assets)
            } else {
                const response = await axios.post(solanaBaseURL, {
                    id: 67,
                    jsonrpc: "2.0",
                    method: "qn_fetchNFTs",
                    params: {
                        "wallet": address,
                        "omitFields": [
                            "provenance"
                        ],
                        "page": 1,
                        "perPage": 40
                    }
                })
                console.log(response)
                const data = response.data
                console.log(data)
                const result = data.result
                const assets = result?.assets
                setNftData(assets)
            }
            // setNftData(data)

        } catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleAddress = (e) => {
        e.preventDefault()
        const input = e.target[0].value
        console.log(input)
        setAddress(input)
    }

    useEffect(() => {
        if(address) {
            getNFTData()
        }
    }, [address])

    return (
        <div>

            <div className='py-4'>
                <h1 className='text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-600'>BLIP</h1>
                <p className='text-center'>home for NFTs</p>
            </div>
            {/* Input to add eth or solana address with tailwind styling */}
            <form onSubmit={(e) => handleAddress(e)} className='flex justify-center'>
                <input
                    className='w-96 h-10 px-4 py-2 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black'
                    type='text'
                    placeholder='Enter ETH or SOL address'
                    // onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    className='w-20 h-10 px-4 py-2 ml-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700'
                    type='submit'
                >
                    Submit
                </button>
            </form>

            {/* Create a grid div for NFT data to display */}
            <div className="grid grid-cols-4 gap-4 py-4 md:py-8">
            {
                nftData.map((nft, index) => {
                    return (
                        <div key={index}>
                            <h3>{nft?.name?.length > 15 ? nft?.name?.slice(0, 15) : nft?.name}</h3>
                            <img 
                                className='w-24 h-24 rounded-xl' 
                                src={nft?.imageUrl} 
                                alt={nft?.name}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src="https://i.imgur.com/qkjElDk.png";
                                }}
                            />
                            <p>{nft?.collectionName?.length > 10 ? nft?.collectionName?.slice(0, 10) : nft?.collectionName}</p>
                            <p>{nft?.collectionTokenId?.length > 10 ? nft?.collectionTokenId?.slice(0, 10) : nft?.collectionTokenId}</p>
                        </div>
                    )
                })
            }
            </div>

            {/* Loading */}
            {loading && <h3>Loading...</h3>}
            {/* Error */}
            {error && <h3>{error}</h3>}

        </div>
    )
}

export default NFTScreen