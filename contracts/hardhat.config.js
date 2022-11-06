require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: '0.8.17',
  
  networks:{

    localhost: {
      url: "http://127.0.0.1:7545",
      accounts:['0x93509506ea5794c2c7f1fc7914abea24b7ec6ab0209c4124b0c88c72254cecc3']
    }

  }
  
}
