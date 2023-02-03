export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;
varying vec3 pos;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .015));
    
  }  

  void uvRipple(inout vec2 uv, float intensity){

    vec2 p = uv -.5;
    
    
      float cLength=length(p);
    
       uv= uv +(p/cLength)*cos(cLength*15.0-(uTime * .25)*.5)*intensity;
    
    } 
    

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    modelPosition.x +=sin(modelPosition.y * 2. + uTime);

    // modelPosition.y +=sin(modelPosition.x* 200. );

    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

   
    // modelPosition.y += (sin(uTime  + modelPosition.x) +1.)/2. * 1. * .2;
    // modelPosition.z += (cos(uTime  + modelPosition2.y) +1.)/2. * 1. * .3;

   modelPosition.y  -= (sin(uTime + length(modelPosition.xz) ) *2.);

  //  modelPosition.x  -= (sin(uTime + length(modelPosition2.xz) ) *.5);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    
    // gl_PointSize = mix( 
    //   (15. * ((sin(uTime * .2) + length(modelPosition2.xy) +1. ) *.5)  )  * 1. * 1.,
    //   (150. * ((cos(uTime * .2) + length(modelPosition.yz) +1. ) *.5)  )  * 1. * 1.,
    //   cos((uTime * .4) + length(modelPosition.xy))
    // );
    // // gl_PointSize = (120. * ((sin(uTime) + length(modelPosition2.xy) +1. ) *.5)  )  * 1. * 1.;
    gl_PointSize = (280. )  * 1. * 1.;
      // gl_PointSize =( 10000. * sin(uTime * .2)) ;
    // gl_PointSize = (50. * ((cos(uTime) + length(modelPosition.xy) +1. ) *.5)  )  * 1. * 1.;
    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
    pos = modelPosition.xyz;
}`