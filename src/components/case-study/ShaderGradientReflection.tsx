"use client";

import { useEffect, useRef } from "react";

interface Props { className?: string; }

const VS = `#version 300 es
precision highp float;
out vec2 vUv;
void main() {
  float x = float((gl_VertexID & 1) << 2);
  float y = float((gl_VertexID & 2) << 1);
  vUv = vec2(x * 0.5, y * 0.5);
  gl_Position = vec4(x - 1.0, y - 1.0, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float u_time;
uniform float u_speed;
uniform vec3 u_colors[12];
uniform float u_colorPositions[12];
uniform int u_colorCount;
uniform float u_direction;
uniform float u_grain;
uniform vec2 u_resolution;
uniform float u_warpIntensity;
uniform float u_smoothness;
uniform float u_distortion;
uniform float u_swirl;
uniform vec2 u_meshPoints[8];
uniform int u_meshPointCount;
uniform int u_hdr;
uniform int u_blendMode;
uniform float u_blendIntensity;
uniform float u_blendOffset;
uniform float u_blendRotation;
uniform float u_blendScale;
uniform int u_blendAnimRotation;
uniform int u_blendAnimIntensity;
uniform int u_blendAnimOffset;
uniform float u_blendAnimSpeed;
uniform float u_blendNoiseMask;
uniform float u_blendNoiseScale;
uniform float u_blendFalloff;
uniform int u_blendDualLayer;
uniform int u_blendMode2;
uniform float u_blendIntensity2;
uniform float u_blendOffset2;
uniform float u_blendRotation2;
uniform float u_blendScale2;
uniform vec2 u_mouse;
uniform int u_mouseMode;
uniform int u_mousePressed;
uniform vec2 u_mouseVelocity;
uniform sampler2D u_imageTexture;
uniform int u_hasImage;
uniform float u_imageIntensity;
uniform int u_imageFitMode;
uniform vec2 u_imageSize;

vec3 mod289_3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289_2(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289_3(((x*34.0)+1.0)*x);}
float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289_2(i);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x_=2.0*fract(p*C.www)-1.0;vec3 h=abs(x_)-0.5;vec3 ox=floor(x_+0.5);vec3 a0=x_-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}
vec3 srgbToLinear(vec3 c){c=clamp(c,0.0,1.0);return mix(c/12.92,pow((c+0.055)/1.055,vec3(2.4)),step(vec3(0.04045),c));}
vec3 linearToSrgb(vec3 c){c=max(c,vec3(0.0));return mix(c*12.92,1.055*pow(c,vec3(1.0/2.4))-0.055,step(vec3(0.0031308),c));}
vec3 linearToOklab(vec3 c){float l=0.4122214708*c.r+0.5363325363*c.g+0.0514459929*c.b;float m=0.2119034982*c.r+0.6806995451*c.g+0.1073969566*c.b;float s=0.0883024619*c.r+0.2817188376*c.g+0.6299787005*c.b;float l_=pow(l,1.0/3.0);float m_=pow(m,1.0/3.0);float s_=pow(s,1.0/3.0);return vec3(0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,0.0259040371*l_+0.7827717662*m_-0.8086757660*s_);}
vec3 oklabToLinear(vec3 lab){float l_=lab.x+0.3963377774*lab.y+0.2158037573*lab.z;float m_=lab.x-0.1055613458*lab.y-0.0638541728*lab.z;float s_=lab.x-0.0894841775*lab.y-1.2914855480*lab.z;return vec3(+4.0767416621*l_*l_*l_-3.3077115913*m_*m_*m_+0.2309699292*s_*s_*s_,-1.2684380046*l_*l_*l_+2.6097574011*m_*m_*m_-0.3413193965*s_*s_*s_,-0.0041960863*l_*l_*l_-0.7034186147*m_*m_*m_+1.7076147010*s_*s_*s_);}
vec3 acesTonemap(vec3 x){return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.0,1.0);}
float interleavedGradientNoise(vec2 p){return fract(52.9829189*fract(dot(p,vec2(0.06711056,0.00583715))));}
float grain(vec2 uv,float time,float intensity){return snoise(uv*400.0+time*7.0)*intensity;}

void main(){
  vec2 uv=vUv;
  float time=u_time*u_speed;
  float aspect=u_resolution.x/max(u_resolution.y,1.0);
  vec2 p=uv;
  float warp=snoise(p*2.5+time*0.2);
  float warp2=snoise(p*4.0-time*0.15);
  p+=vec2(warp,warp2)*u_warpIntensity*0.15;
  float smoothExp=2.0+u_smoothness*4.0;
  vec3 colorSum=vec3(0.0);
  float weightSum=0.0;
  int count=min(u_meshPointCount,u_colorCount);
  count=min(count,8);
  for(int i=0;i<8;i++){
    if(i>=count)break;
    vec2 point=u_meshPoints[i];
    vec2 diff=p-point;
    diff.x*=aspect;
    float dist=length(diff);
    float weight=1.0/(pow(max(dist,0.001),smoothExp));
    vec3 lin=srgbToLinear(u_colors[i]);
    vec3 blendColor=linearToOklab(lin);
    colorSum+=blendColor*weight;
    weightSum+=weight;
  }
  vec3 blended=colorSum/max(weightSum,0.001);
  vec3 color=oklabToLinear(blended);
  color+=grain(uv,time,u_grain);
  vec3 mapped=acesTonemap(max(color,vec3(0.0)));
  vec3 srgb=linearToSrgb(mapped);
  float dither=(interleavedGradientNoise(gl_FragCoord.xy)-0.5)/255.0;
  srgb+=dither;
  fragColor=vec4(clamp(srgb,0.0,1.0),1.0);
}`;

export function ShaderGradientReflection({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VS);
    const fs = compile(gl.FRAGMENT_SHADER, FS);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    // Uniforms
    gl.uniform1f(gl.getUniformLocation(prog, 'u_speed'), 0.62);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_direction'), 26.0);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_grain'), 0.0);
    gl.uniform3fv(gl.getUniformLocation(prog, 'u_colors'), [
      0.9098, 0.6275, 0.7059,
      0.7882, 0.2980, 0.4353,
      0.5451, 0.1333, 0.3216,
      0.9882, 0.8941, 0.9255,
      0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0,
    ]);
    gl.uniform1fv(gl.getUniformLocation(prog, 'u_colorPositions'), [0,0.33,0.67,1, 0,0,0,0,0,0,0,0]);
    gl.uniform1i(gl.getUniformLocation(prog, 'u_colorCount'), 4);
    gl.uniform1i(gl.getUniformLocation(prog, 'u_hdr'), 0);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_warpIntensity'), 0.3);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_smoothness'), 0.75);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_distortion'), 0.0);
    gl.uniform1f(gl.getUniformLocation(prog, 'u_swirl'), 0.0);
    // Mesh points
    gl.uniform2fv(gl.getUniformLocation(prog, 'u_meshPoints'), [0.2,0.3, 0.8,0.2, 0.5,0.7, 0.3,0.9, 0,0, 0,0, 0,0, 0,0]);
    gl.uniform1i(gl.getUniformLocation(prog, 'u_meshPointCount'), 4);

    const tLoc = gl.getUniformLocation(prog, 'u_time');
    const rLoc = gl.getUniformLocation(prog, 'u_resolution');

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const t0 = performance.now();
    const draw = () => {
      gl.uniform1f(tLoc, (performance.now() - t0) / 1000);
      if (rLoc) gl.uniform2f(rLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} style={{ width: "100%", height: "100%", display: "block" }} />;
}
