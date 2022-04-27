const web3 = require('@solana/web3.js');

(
    async() => {
        var connection = new web3.Connection(
            "https://summer-black-sun.solana-devnet.quiknode.pro/299eba8a7616239429817a494089b46229c325c8/",
            "confirmed"
        )
        let tx = await connection.getTransaction("4D5xWN5WEycCDrFJDSfKZFacEBaqoErkzNaPKhXatiMywzK4Q4FegFPXjkZDGTr5Q2FtECLi6UQaXuoso1rbZ44v")
        console.log(tx.transaction.message.accountKeys[2].toBase58())
        let txValue = tx.meta.postBalances[1] - tx.meta.preBalances[1]
        var comingFrom
        for (let accKey of tx.transaction.message.accountKeys) {
            if (accKey.toBase58() !== "FumYkjqdYi6rb3bEKDxEbDMgkUQjRrriucyorA3Z5vTy" && accKey.toBase58() !== "11111111111111111111111111111111") {
                comingFrom = accKey.toBase58()
            }
        }
        console.log(tx.transaction.message.accountKeys[1].toBase58())
        console.log(`Value: ${txValue / web3.LAMPORTS_PER_SOL} SOL\nComing from: ${comingFrom}`)
    }
)()