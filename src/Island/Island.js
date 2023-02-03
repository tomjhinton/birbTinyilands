import { shaderMaterial, useGLTF, Clone} from '@react-three/drei'
import React, { useRef, useState , useMemo} from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";


function Rock({position, rotation, scale}){

    let tree = useRef()
    const model = useGLTF('rock.glb')
   
    return <>
         <Clone object={model.scene} scale={scale} position={position} rotation={rotation} castShadow/>

    </>
}

function Tree({position, rotation, scale}){

    let tree = useRef()
    const model = useGLTF('palmTree.glb')
   
    return <>
         <Clone object={model.scene} scale={scale} position={position} rotation={rotation} castShadow/>

    </>
}




export default function Island(props){
// console.log(props)
    const rocks = useMemo(() => {
        const rocks = []

        for(let i=0;i<35;i++){
            rocks.push({
                position:[Math.sin(i) * 2. + (Math.random() *(Math.random() < 0.5 ? -1 : 1)),2.5, Math.cos(i) * 2. + (Math.random() *(Math.random() < 0.5 ? -1 : 1))]
       ,rotation: [0, Math.random() * Math.PI,0 ],
    scale: Math.random() *.35
        })}
        return rocks
    },[])

    const PlaneMaterial = shaderMaterial(

        {
            uTime: 0,
            uRandom: Math.random()
           
        },
        vertexShader,
        fragmentShader
    )
    extend({PlaneMaterial})

    const planeMaterial = useRef()

    // console.log(planeMaterial.current.uniforms.uRandom)
useFrame((state, delta) => {
    planeMaterial.current.uTime += delta
})


    return<>
    <group position={props.position} rotation-y={props.rotationY}>
       
            <RigidBody type="fixed" colliders="hull"  rotation-x={ Math.PI * 2.}>
         <mesh position-y={2}>
        <cylinderGeometry args={[4, 6, 1, 8]} />
        <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent/>
    </mesh>
    </RigidBody>
   

    <Tree position={[Math.random(),2.5, Math.random()]} scale={2} rotation-y={Math.PI * Math.random()}/>

    { rocks.map((x, index) =>{
      
      return <Rock key={index} 
       position={x.position}
       rotation= {x.rotation }
       scale={x.scale}/>
   })}
    </group>
    </>
}