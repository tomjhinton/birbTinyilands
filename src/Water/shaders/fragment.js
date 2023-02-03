export default /* glsl */`uniform float uTime;

varying vec2 vUv;



  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 




void main() {
  vec2 uv = vUv;
  
  
 
 vec3 color = vec3(1.);
  
 

      

   


     
        color = vec3(0., 0., 1.);

        vec3 color2 = vec3(uv.x, uv.y, 1.);
        coswarp(color2, 3.);
        coswarp(color2, 3.);
        coswarp(color2, 3.);
     
      color += color2.r * .2;
      

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), 1.);
}`