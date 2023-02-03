import {  shaderMaterial, Center, Text, Float} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'

export default function Title(){

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

    return<>
    <Float>
         <Text
        
        font="Basement.otf"
        scale={6. }
        // maxWidth={1}
        position={ [ .0, 16.65, 0 ] }
        
        
        >
          {'Tiny Islands'.toUpperCase()}
          <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent/>

        
        </Text>
        </Float>
        </>
}