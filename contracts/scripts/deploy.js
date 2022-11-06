

const hre = require('hardhat')

const main = async () => {
    const CarContract = await hre.ethers.getContractFactory('CarContract')
    const carContract = await CarContract.deploy()
    await carContract.deployed()
    console.log('CarContract deployed to:', carContract.address)

}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

runMain()
