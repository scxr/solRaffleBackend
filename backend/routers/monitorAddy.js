const web3 = require('@solana/web3.js');
const raffleModel = require("../models/raffleModel")
const raffleEntry = require("../models/raffleEntries")

function rndmNum() {
    return Math.floor(Math.random() * 1000)
}
async function main()  {
    console.log("Monitoring addresses....")
    var connection = new web3.Connection(
        "https://summer-black-sun.solana-devnet.quiknode.pro/299eba8a7616239429817a494089b46229c325c8/",
        "confirmed"
    )
    var pubkey = "GaMLEpGNRu1ZybYG4srektA9NWXARRVujXLGarTsSGiw"
    var programKey = ""
    async function getTxs(slot, config) {
        let block = await connection.getBlock(slot)
        var key = ""
        var comingFrom = ""
        for (let tx of block.transactions) {
            for (let txkey of tx.transaction.message.accountKeys) {
                key = txkey.toBase58().toLowerCase()
                if (key == pubkey.toLowerCase()) {
                    let txValue = tx.meta.postBalances[1] - tx.meta.preBalances[1]
                    for (let accKey of tx.transaction.message.accountKeys) {
                        if (accKey.toBase58().toLowerCase() !== pubkey.toLowerCase()  && accKey.toBase58() !== programKey) {
                            console.log(accKey.toBase58())
                            comingFrom = accKey.toBase58()
                        }
                    }
                    const ticketNumber = rndmNum()
                    if (txValue < config.entryPrice) {
                        console.log("Not enough value sent with TX should be: ", config.entryPrice)
                    } else {
                        const newEntry = new raffleEntry({
                            sender: tx.transaction.message.accountKeys[0].toBase58(),
                            txid: tx.transaction.signatures[0],
                            ticketNumber: ticketNumber,
                            raffleNumber: config.raffleNumber
                        })
                        await newEntry.save()
                        console.log(tx.transaction.message.accountKeys[0].toBase58())
                        console.log(`Value: ${txValue / web3.LAMPORTS_PER_SOL} SOL\nComing from: ${comingFrom}`) 
                    }
                }
            }
        }
    }
    let pub = new web3.PublicKey(pubkey)
    connection.onAccountChange(
        pub,
        async ( updatedAccountInfo, context) => {
            const config = await raffleModel.findOne()
            console.log(config)
            let timeNow = Math.floor(Date.now() / 1000)
            if (timeNow < config.startTime || timeNow > config.endTime) {
                console.log("Out of bounds")
            } else {
                await getTxs(context.slot, config)
            }
            
        },
            "confirmed",
    );
    
}

main()