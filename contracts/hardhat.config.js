require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: '0.8.3',
  
  networks:{

    localhost: {
      url: "http://127.0.0.1:7545",
      accounts:['0x93509506ea5794c2c7f1fc7914abea24b7ec6ab0209c4124b0c88c72254cecc3']
    }

  }
  
}
