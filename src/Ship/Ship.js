

import { useControls } from "leva";

import { shaderMaterial, useGLTF, useKeyboardControls} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'

import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";


export default function Ship(props){

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
    const [subscribeKeys, getKeys] = useKeyboardControls() 


const forward = useKeyboardControls((state) =>  state.forward)
const backward = useKeyboardControls((state) =>  state.backward)
const leftward = useKeyboardControls((state) =>  state.leftward)
const rightward = useKeyboardControls((state) =>  state.rightward)
const jump = useKeyboardControls((state) =>  state.jump)


const body = useRef()
const groupRef = useRef()
const referenceDirection = new THREE.Vector3(0, 0, 1);
const worldReferenceDirection = new THREE.Vector3(0, 0, 1);

useFrame((state, delta ) =>{
    const {forward, backward, leftward, rightward} = getKeys()

    let impulse = { x: 0, y: 0, z: 0 }
    const torque = { x :0, y: 0, z: 0 }

    const impulseStrength = 10.6 
    const torqueStrength = 10.2 

    
    const meshWorldPosition = new THREE.Vector3();
    groupRef.current.getWorldPosition(meshWorldPosition);

    // console.log(groupRef.current)
    const direction = groupRef.current.getWorldDirection(worldReferenceDirection);
    const angle = direction.angleTo(referenceDirection);



   
    
   
    if(leftward){
        


       
        torque.y  += torqueStrength
    }

    if(forward){
        console.log(angle)
        if(angle< 0.01){

            impulse.x += impulseStrength
        }

        if(angle> 0.1 && angle< 1.6){

            impulse.z -= impulseStrength
        }

        if(angle> 1.6 && angle< 2.8){

            impulse.x -= impulseStrength
        }
       
       
    }

    if(rightward){
       
        torque.y  -= torqueStrength
    }

    if(backward){
        if(angle< 0.01){

            impulse.x -= impulseStrength
        }

        if(angle> 0.1 && angle< 1.6){

            impulse.z += impulseStrength
        }

        if(angle> 1.6 && angle< 2.8){

            impulse.x += impulseStrength
        }
      
    }

    if(jump){
        // console.log(body.current)
        if(groupRef.current.position.y < 1){
        body.current.applyImpulse({x : 0, y : 100.5, z :0})
        }
    }

    body.current.applyImpulse(impulse)
    body.current.applyTorqueImpulse(torque)
})
    
   
    const { nodes, materials } = useGLTF("ship.glb");
    return (<>
   
        <RigidBody 
        colliders="cuboid"
         ref={body}
         restitution={.02}
    friction={.1}
    linearDamping={.5}
    angularDamping={.15}>
      <group {...props} dispose={null}
      ref={groupRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ship.geometry}
          material={materials["Material.001"]}
          position={[-0.01, 0.3 +2.2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.sail.geometry}
          
          position={[0.03, 1.59 +2.2, 0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[1, 1, 0.01]}
        >
        <planeMaterial ref={planeMaterial} side={THREE.DoubleSide} transparent/>
        </mesh>

      </group>
      </RigidBody>

     
      </>
    );
  }

