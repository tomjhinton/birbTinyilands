import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points, QuadraticBezierLine} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


import * as random from "maath/random";
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";



export default function Stars(){
 

  const box = random.onBox(new Float32Array(500), { sides: [40, 16, 40] });
   
      
    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height}
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

    // console.log(PointMaterial)

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})




// Subscribe this component to the render-loop, rotate the mesh every frame
// useFrame((state, delta) => (ref.current.rotation.x += (delta * .12)))
// useFrame((state, delta) => (ref.current.rotation.z -= (delta * .12)))

    return(

<>


    
       


        <Points positions={box} stride={3} ref={ref} rotation-x={Math.PI *  1.} position-y={9}>
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
    </Points>


    

 
      </>
    )
}