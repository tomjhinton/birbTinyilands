import {  useGLTF, Text, Float } from "@react-three/drei"
import { OrbitControls , shaderMaterial, Center} from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { useRef , useEffect, useState, useMemo} from "react"
import { BlendFunction } from 'postprocessing'
import { Perf } from "r3f-perf"
import * as THREE from 'three'
import { useThree } from "@react-three/fiber"
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react"

import Island from "./Island/Island.js"
import Water from "./Water/Water.js"
import Stars from "./Stars/Stars.js"

import Ship from "./Ship/Ship.js"

import Title from "./Title/Title.js"




function ClippingPlane() {
    const { gl } = useThree();
    let plane = new THREE.Plane( new THREE.Vector3( 0,  .5, 0 ), 0.8 );
    console.log(plane)
    gl.clippingPlanes = [plane];
    gl.localClippingEnabled = true;
    return <></>;
  }

export default function Experience(){



    return <>
      <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>
      <Title />
      <Suspense >
      <Physics>
        <Island  position={[-4,0,-8]} rotationY={Math.PI * Math.random()}/>

        <Island  position={[13,0,2]} rotationY={Math.PI * Math.random()}/>

        <Island  position={[-10,0,8]} rotationY={Math.PI * Math.random()}/>
        <Water /> 
        <Stars />            
        <Ship />
        {/* <Debug /> */}
        </Physics>
        </Suspense >
        {/* <ClippingPlane /> */}


    </>
}