"use client";

import { useEffect, useRef } from "react";

interface ShaderGradientProps {
  variant?: "reflection" | "footer";
  className?: string;
}

// ===== REFLECTION: WebGL1 aurora shader =====
const R_VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}`;
const R_FRAG = `
precision highp float;
uniform float t;uniform vec2 r;
vec3 m2(vec3 x){return x-floor(x/289.)*289.;}
vec2 m2v(vec2 x){return x-floor(x/289.)*289.;}
vec3 pm(vec3 x){return m2(((x*34.)+1.)*x);}
float sn(vec2 v){
  const vec4 C=vec4(.2113,.3660,-.5773,.0244);
  vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=m2v(i);
  vec3 p=pm(pm(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;
  m*=1.7928-.8537*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float T=t*.12;
  float n1=sn(vec2(uv.x*1.8+T*.4,uv.y*.6+T*.15));
  float n2=sn(vec2(uv.x*1.2-T*.3,uv.y*1.5+T*.2));
  float n3=sn(vec2(uv.x*2.5+T*.15,uv.y*2.+T*.1));
  float w1=smoothstep(-.2,.8,.5+.5*sin(uv.y*4.+n1*2.5+T*1.2));
  float w2=smoothstep(-.1,.9,.5+.5*sin(uv.y*3.+n2*2.+T*.8+1.));
  float w3=smoothstep(0.,.7,.5+.5*cos(uv.x*2.5+n3*1.8+T*.6));
  vec3 c1=vec3(.01,.24,.54),c2=vec3(0.,.47,.71),c3=vec3(0.,.71,.85),c4=vec3(.56,.88,.94);
  vec3 col=c1*w1*.55+c2*w2*.45+c3*w3*.35+c4*sn(vec2(uv.x*3.+T*.5,uv.y*3.-T*.3))*.12;
  col+=sn(uv*10.+T)*.015;
  float vig=1.-length((uv-.5)*1.4);col*=smoothstep(0.,.7,vig);
  gl_FragColor=vec4(col,1);
}`;

// ===== FOOTER: WebGL1 dark aurora =====
const F_FRAG = `
precision highp float;
uniform float t;uniform vec2 r;
vec3 m2(vec3 x){return x-floor(x/289.)*289.;}
vec2 m2v(vec2 x){return x-floor(x/289.)*289.;}
vec3 pm(vec3 x){return m2(((x*34.)+1.)*x);}
float sn(vec2 v){
  const vec4 C=vec4(.2113,.3660,-.5773,.0244);
  vec2 i=floor(v+dot(v,C.yy)),x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=m2v(i);
  vec3 p=pm(pm(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.,h=abs(x)-.5,ox=floor(x+.5),a0=x-ox;
  m*=1.7928-.8537*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float T=t*.1;
  float n1=sn(vec2(uv.x*2.+T*.3,uv.y*.8+T*.12));
  float n2=sn(vec2(uv.x*1.5-T*.2,uv.y*1.3+T*.18));
  float n3=sn(vec2(uv.x*1.8+T*.1,uv.y*2.2-T*.15));
  float w1=smoothstep(-.1,.7,.5+.5*sin(uv.y*3.5+n1*2.+T));
  float w2=smoothstep(0.,.8,.5+.5*sin(uv.y*2.8+n2*1.8+T*.7));
  float w3=smoothstep(-.1,.6,.5+.5*cos(uv.x*2.+n3*2.+T*.5));
  vec3 c1=vec3(.1,.1,.1),c2=vec3(.25,.25,.25),c3=vec3(.04,.04,.04),c4=vec3(.18,.18,.18);
  vec3 col=c1*w1*.6+c2*w2*.4+c3*w3*.5+c4*sn(vec2(uv.x*3.+T*.4,uv.y*3.-T*.3))*.08;
  col+=sn(uv*8.+T)*.008;
  float vig=1.-length((uv-.5)*1.2);col*=smoothstep(0.,.8,vig);
  gl_FragColor=vec4(col,1);
}`;

function initShader(canvas: HTMLCanvasElement, fragSrc: string): (() => void) | null {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return null;

  const compile = (src: string, type: number) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("Shader error:", gl.getShaderInfoLog(s));
    }
    return s;
  };

  const vs = compile(R_VERT, gl.VERTEX_SHADER);
  const fs = compile(fragSrc, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("Link error:", gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uT = gl.getUniformLocation(prog, "t");
  const uR = gl.getUniformLocation(prog, "r");

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 1.5);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener("resize", resize);

  let id: number;
  const t0 = performance.now();
  const loop = () => {
    gl.uniform1f(uT, (performance.now() - t0) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    id = requestAnimationFrame(loop);
  };
  loop();

  return () => {
    cancelAnimationFrame(id);
    window.removeEventListener("resize", resize);
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
  };
}

export function ShaderGradient({ variant = "reflection", className = "" }: ShaderGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const frag = variant === "footer" ? F_FRAG : R_FRAG;
    const cleanup = initShader(canvas, frag);
    return () => { if (cleanup) cleanup(); };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
