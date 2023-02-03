import { OrbitControls , shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";



export default function(){

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
           
        },
        vertexShader,
        fragmentShader
    )
    extend({PlaneMaterial})

    const planeMaterial = useRef()
useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
})

return <>
        <mesh rotation-x={ - Math.PI * 0.5 } position-z={0}  position-y={-.2 }>
        <boxGeometry args={[40., 40, 3, 100, 100]}  />
        <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} />
    </mesh>

    <CuboidCollider position={[0, -1.8, 0]} args={[20, 3, 20]} type="fixed"/>
    

</>

}