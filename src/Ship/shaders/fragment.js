export default /* glsl */`uniform float uTime;

varying vec2 vUv;
const float PI = 3.1415926535897932384626433832795;

varying vec3 pos;

  
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



float shape( in vec2 p, float sides ,float size)
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  float N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  1.0-smoothstep(size,size +.1,d);
}



void main() {
  vec2 uv = vUv;
  
  float alpha = 1.;
 
 vec3 color = vec3(1.);

 vec3 color2 = vec3(uv.x, uv.y, 1.);

 coswarp(color2, 3.);
  
 
 vec3 red    = vec3(.667, .133, .141);
 vec3 blue   = vec3(0.,   .369, .608);
 vec3 yellow = vec3(1.,   .812, .337);
 vec3 beige  = vec3(.976, .949, .878);
 vec3 black  = vec3(0.);
 vec3 white  = vec3(1.);

 uvRipple(uv, 1.);
 uv = fract(uv * 5.);

      

   color = mix(  red, color,step(shape(uv, 4. , .6), .5));

   color = mix(  blue, color, step(shape(uv +.1, 3. , .6), .5));

   color = mix(  yellow, color, step(shape(uv +.2, 5. , .6), .5));

   color = mix( black, color, step(shape(uv , 6. , .2), .5));


   




    
  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`