// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;


import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import 'hardhat/console.sol';

/**
The abstract of the Smart Contract is to achieve disintermidiation objective. Drivers keep thier deposit in crypto (eth) in the Escrow Smart Contract.
This project potentially involves multiple entities and authoritises for due-diligent process. Such as KYC.
 */
contract CarContract is  Ownable,  ReentrancyGuard, ERC721URIStorage {

    /*
    Use the Counter API to generate rental id.
     */
    using Counters for Counters.Counter;

    Counters.Counter private _rentalId;


    Counters.Counter private _tokenIds;


    /*
    Using Safe Math
     */
    using SafeMath for uint;
    /*
    Define a withdrawer role in this contract
     */
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    string BaseUri = "https://ipfs.io/ipfs/";
    
  /*
    Enumeration of Rental contract's state to determine the contract status.
     */
    enum RentalState {Vacant, Occuppied }

    /*
    Auto generated ID - Potentially, could use ChainLink(Oracle).
     */
    uint  private rentalId;
    
    /*

    /*
    Auto generated ID - Potentially, could use ChainLink(Oracle).
     */
    uint  private carId;
    
    /*

    Constant value for Rental contract duration - 2 weeks - Pontentially for TimeLockedControl
     */
    uint constant Duration = 14;
   
    /*
    Rentals mapping to addresses
     */
    mapping(address => Rental) public Rentals;


    /*
    Event log for Car Rent
     */
    event LogForRent(uint id);

    /*
    Event log for Car Rent - Status change to Occuppied(Booked)
     */
    event LogForOccuppied(uint id);



    /*
    Event log for Rental contract created
     */
    event LogForCreated(address add);
  

    /*
    Event log for renting a car
     */
    event LogRentCar(uint rentalId);

    /*
    Event log for withdraw fund upon car returned
     */
    event LogWithdraw(address render, uint deposit);

    /**
    event log for fallback function trigger
     */
     event LogFallback(address caller, string message);
 

  
     event LogCreateCertificate(string tokenURI, address caller, uint certId);
    /*
     Mint certificate 
    */

  
     /*
      @notice: Rental Struct Object/Entity
      @param: id - unique id
      @param: datetime - Concract created datetime in Epoch time format.
      @param: driver name - Driver name
      @param: driving License Id - In Bytes32 hash value - Anonymouse(GDPR).
      @param: duration - Renting period.
      @param: deposit - deposit for renting. Technically the price should based on the car model and capacity.
      @param: cid - The Car id
      @param: State - To determine th current of the Rental contract.
     */
   
    struct Rental {
        uint id;
        uint datetime;
        string drivername;
        bytes32 drivinglicenseid;
        address payable driver;
        uint duration;
        uint deposit;
        uint cid;
        RentalState state;
        string imageuri;
        string ipfsuri;
    }


   
    /*
      Modifier to check whether the msg.value is sufficient to pay the deposit.
     */
      modifier paidEnough(uint _deposit) { 
        require(msg.value >= _deposit, "Insufficient fund to pay deposit"); 
        _;
    }

    /*
      Modifier to check whether the Driver's address whether is refundable.
     */
    modifier IsRefundable(address driver) {
    require((Rentals[driver].driver != address(0)) && (Rentals[driver].state == RentalState.Occuppied), "Not refundable with error");
    
      _;
   }

  /*
   Modifier - To prevent Owner itself to make a car booking. 
   */
   modifier isNotOwner(address driver){
       require(msg.sender != owner(), "Owner is not allowed for bookings");
       _;
   }

     /*
      Modifier to check whether the Driver double booking
     */
    modifier canBook(address driver) {
    require((Rentals[driver].state == RentalState.Vacant), "Double booking is not allowed");
    
      _;
   }

    /*
      Constructor
      Give the withdrawer role to onwer.
     */
    constructor() ERC721("Car Certificate", "CCT") {
       
      emit LogForCreated(address(this));
    }

    
    /*
    @notice - A non-payable callback function to handle miscalled functions.
    */
    fallback() external {
        emit LogFallback(msg.sender, "Fallback was called!!!");
    }


/*
 @notice Car renting function 
 @param: uid - Unique id of the vehicle (It can be registration number or RFID)
 @param:  driver name - Name of the driver. Calldata to optimise the gas.
 @param:  driving license id - Driving Identify of the driver, this information should be masked and hashed to compliance with GDPR.
 @param:  booking date - The exact booking date.
 @param:  return - True. If no errors.
 @Param: IPFS uri
 */
function rentCar(uint _uid,string calldata _drivername,bytes32 _drivinglicenseid, uint _datetime, string calldata _imageuri, string calldata _ipfsuri) external  payable canBook(msg.sender) isNotOwner(msg.sender)  returns(bool) {
    uint256 amount = msg.value;
    address payable driver = payable(msg.sender);
    Rentals[driver] = Rental({
    id: rentalId,
    drivername: _drivername,
    drivinglicenseid: _drivinglicenseid,
    datetime: _datetime,
    duration: Duration,
    deposit:amount,
    driver: driver,
    cid:_uid,
    imageuri:_imageuri,
    ipfsuri: _ipfsuri,
    state: RentalState.Occuppied
    });
    
    _rentalId.increment();
    CreateCertificate(BaseUri);
    emit LogRentCar(rentalId);
    return true;
    
}


/*
@notice: Fetch Rental by driver's address(0x0)
@param: Return the Rental Struct object
 */
function fetchRental(address payable driver) public view  returns(uint rid, uint datetime, uint duration, uint deposit,address payable renter, uint cid, uint state, string memory ipfsuri) {

        rid = Rentals[driver].id; 
        datetime = Rentals[driver].datetime;
        duration = Rentals[driver].duration;
        deposit = Rentals[driver].deposit;
        renter = Rentals[driver].driver;
        cid = Rentals[driver].cid;  
        state = uint(Rentals[driver].state);  
        ipfsuri =  string(Rentals[driver].ipfsuri);  


return (rid, datetime, duration, deposit, renter,cid,state, ipfsuri); 
}





 /* Mints a token and lists it in the marketplace*/
    function CreateCertificate(string memory tokenURI) private  returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      emit LogCreateCertificate(tokenURI, msg.sender, newTokenId);
      return newTokenId;
    }

}

