import React, { useRef, useEffect, useState, Suspense } from "react";
import "./App.scss";
//Components

import { Section } from "./components/section";

// Page State
import state from "./components/state";

// R3F
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";
import { Button, Link } from "@mui/material";
import { useMoralis } from "react-moralis";
import {Moralis} from "moralis-v1";
// import { ethers } from 'ethers'
import axios from 'axios';

import NFTMarketplace_abi from "../src/contractsabi/Marketplace.json";
import NFT_abi from "../src/contractsabi/NFT.json";
import CarContract_abi from "../src/contractsabi/CarContract.json";
import Simple_abi from "../src/contractsabi/simple.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import Entry from "./form";
require('dotenv').config();

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const HTMLContent = ({
  domContent,
  children,
  bgColor,
  modelPath,
  positionx,
  positiony,
  positionz,
  scale_value,
  caroffset,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));
  const [refItem, inView] = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView, bgColor]);
  return (
    <Section factor={1.5} offset={0.7}>
      <group position={[positionx, positiony, positionz]} scale={[scale_value,scale_value,scale_value]}>
        <Html fullscreen portal={domContent}>
          <div ref={refItem} className='container'>
            <h1 className='title'>{children}</h1>
          </div>
        </Html>
        <mesh ref={ref} position={[0, -250-caroffset, 0]}>
          <Model url={modelPath} />
        </mesh>
      </group>
    </Section>
  );
};

function Loader() {
  const { active, progress } = useProgress();
  const transition = useTransition(active, {
    from: { opacity: 1, progress: 0 },
    leave: { opacity: 0 },
    update: { progress },
  });
  return transition(
    ({ progress, opacity }, active) =>
      active && (
        <a.div className='loading' style={{ opacity }}>
          <div className='loading-bar-container'>
            <a.div className='loading-bar' style={{ width: progress }}></a.div>
          </div>
        </a.div>
      )
  );
}



async function bookMe(){
    try {
      const result = await axios.post('https://rcdwgyydfr7ofyjmhzsoy6k33i0dpwbd.lambda-url.us-east-1.on.aws/');
        console.log(result.data.body.OwnerName);
    } catch (e) {
      console.error(e);
    } finally {
      console.log('We do cleanup here');
    }

  // const ethers = Moralis.web3Library;
  // const abi = CarContract_abi;
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const carAddress = process.env.REACT_APP_CAR_CONTRACT_ADDRESS;
  // const signer = provider.getSigner()
  // const carContract = new ethers.Contract(carAddress, abi, signer)
  // const bytes32string = ethers.utils.formatBytes32String("001-0003");
  // const driverName = "david";
  // const id = 12;
  // const bookingTime = 20201120;
  // const IPFSHash = "bafkreib36vwxvtu5rqshlqdfzfclhjewzobt2czddzhbdjn3ojraqtre64";
  // const tx =  await carContract.rentCar(id,driverName, bytes32string ,bookingTime, IPFSHash).
  // catch(function(error) {
  //   alert(error.data.message)
  //  });

  //  alert(tx.hash)
 
}



export default function App() {

  const [events] = useState();
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const {isAuthenticated, user, isAuthenticating, authenticate, logout, isLoggingOut} = useMoralis()

  const navigate = useNavigate();
  const entry = () => {
    navigate('/entry')
  }
 
  if (!isAuthenticated) {
  return (
    <>
   
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 150], fov: 70 }}
        >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor='#f15946'
            modelPath='/chevrolet.gltf'
            positionx={0}
            positiony={250}
            positionz={-50}
            caroffset={200}
            scale_value={0.3}>
            <span>Chevrolet</span>
            <span>Corvette (C7)</span>
           
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#571ec1'
            modelPath='/nissan.gltf'
            positionx={0}
            positiony={0}
            positionz={-50}
            caroffset={900}
            scale_value={0.12}>
            <span>Nissan</span>
            <span>Skyline GT-R(C110) Kenmeri</span>
            <Button variant="contained" onClick={()=>bookMe()} >Book Me</Button>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#636567'
            modelPath='/toyota.gltf'
            positionx={0}
            positiony={-250}
            positionz={-50}
            caroffset={0}
            scale_value={0.55}>
            <span>Toyota</span>
            <span>AE86 Black Limited Kouki</span>
           
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100 - 10}vh` }} />
      </div>
    </>
  );
  }

  return (
    <>
     
      {/* R3F Canvas */}
      <Canvas
        concurrent
        colorManagement
        camera={{ position: [0, 0, 150], fov: 70 }}
        >
        {/* Lights Component */}
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            bgColor='#f15946'
            modelPath='/chevrolet.gltf'
            positionx={0}
            positiony={250}
            positionz={-50}
            caroffset={200}
            scale_value={0.3}>
            <span>Chevrolet</span>
            <span>Corvette (C7)</span>
            <Button variant="contained" onClick={()=>entry()} >Book Me</Button>
          
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#571ec1'
            modelPath='/nissan.gltf'
            positionx={0}
            positiony={0}
            positionz={-50}
            caroffset={900}
            scale_value={0.12}>
            <span>Nissan</span>
            <span>Skyline GT-R(C110) Kenmeri</span>
            <Button variant="contained" onClick={()=>bookMe()} >Book Me</Button>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            bgColor='#636567'
            modelPath='/toyota.gltf'
            positionx={0}
            positiony={-250}
            positionz={-50}
            caroffset={0}
            scale_value={0.55}>
            <span>Toyota</span>
            <span>AE86 Black Limited Kouki</span>
            <Button variant="contained" >Book Me</Button>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <Loader />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100 - 10}vh` }} />
      </div>
    </>
  );
}
