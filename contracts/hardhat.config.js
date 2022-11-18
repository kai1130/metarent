require("@nomicfoundation/hardhat-toolbox");


module.exports = {
  solidity: '0.8.17',
  
  networks:{

    localhost: {
      url: "http://127.0.0.1:7545",
      accounts:['0x17146834091b3eac9a7166052934a6aa0604cf48a4101553c3d795914fc76993']
    }

  }
  
}
