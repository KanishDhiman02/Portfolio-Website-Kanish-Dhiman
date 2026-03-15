/**
 * waveParticles.ts
 * ─────────────────────────────────────────────────────────────────
 * WebGL particle system using Three.js + GLSL Simplex-noise shaders.
 * Particles form a smooth wave surface and react to cursor movement.
 */

import * as THREE from "three";

// ─── GLSL Shaders ──────────────────────────────────────────────────────────

const VERTEX_SHADER = /* glsl */ `
  // Classic 3-D Simplex noise (compact inlined version)
  vec3 mod289(vec3 x){ return x - floor(x * (1./289.)) * 289.; }
  vec4 mod289(vec4 x){ return x - floor(x * (1./289.)) * 289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1./6., 1./3.);
    const vec4 D = vec4(0., .5, 1., 2.);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1. - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0., i1.z, i2.z, 1.))
      + i.y + vec4(0., i1.y, i2.y, 1.))
      + i.x + vec4(0., i1.x, i2.x, 1.));
    float n_ = .142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49. * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7. * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1. - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.+1.;
    vec4 s1 = floor(b1)*2.+1.;
    vec4 sh = -step(h, vec4(0.));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.);
    m = m * m;
    return 42. * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  attribute float aSize;
  attribute float aOpacity;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uRepelRadius;
  uniform float uRepelStrength;
  uniform float uAspect;

  varying float vOpacity;

  void main() {
    vec3 pos = position;
    float noiseVal = snoise(vec3(pos.x * 1.4, pos.y * 1.4, uTime * 0.28));
    float noiseVal2 = snoise(vec3(pos.x * 2.6 + 4.1, pos.y * 1.9, uTime * 0.18 + 2.5));
    pos.y += noiseVal  * 0.12;
    pos.x += noiseVal2 * 0.07;

    vec2 mousePosWorld = vec2(uMouse.x, uMouse.y / uAspect);
    vec2 particleFlat  = vec2(pos.x, pos.y);
    vec2 delta         = particleFlat - mousePosWorld;
    float dist         = length(delta);
    if (dist < uRepelRadius && dist > 0.001) {
      float strength = (1.0 - dist / uRepelRadius);
      strength = pow(strength, 1.8);
      pos.xy += normalize(delta) * strength * uRepelStrength;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position  = projectionMatrix * mvPosition;
    vOpacity = aOpacity;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying float vOpacity;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.28, d);
    gl_FragColor = vec4(uColor, alpha * vOpacity);
  }
`;

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ParticleSystem {
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  dispose: () => void;
  resize: (w: number, h: number) => void;
  setMouse: (ndcX: number, ndcY: number) => void;
  clearMouse: () => void;
  tick: (elapsed: number) => void;
}

// ─── Factory ───────────────────────────────────────────────────────────────

export function createParticleSystem(
  canvas: HTMLCanvasElement,
  initW: number,
  initH: number
): ParticleSystem {
  const W = initW;
  const H = initH;
  const dpr = Math.min(window.devicePixelRatio, 2);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  renderer.setPixelRatio(dpr);
  renderer.setSize(Math.max(W, 1), Math.max(H, 1));
  renderer.setClearColor(0x1a28ff, 1);

  const scene  = new THREE.Scene();
  const aspect = W / H;
  const camera = new THREE.OrthographicCamera(
    -aspect / 2, aspect / 2, 0.5, -0.5, 0.1, 10
  );
  camera.position.z = 1;

  const COUNT     = 8000;
  const positions = new Float32Array(COUNT * 3);
  const sizes     = new Float32Array(COUNT);
  const opacities = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * aspect;
    const band = Math.random();
    let y: number;
    if (band < 0.30) {
      const nx = (x / aspect + 0.5);
      y = 0.08 + 0.18 * Math.sin(nx * Math.PI) + (Math.random() - 0.5) * 0.09;
    } else if (band < 0.55) {
      const nx = (x / aspect + 0.5);
      y = -0.06 + 0.12 * Math.sin(nx * Math.PI * 1.7 + 0.8) + (Math.random() - 0.5) * 0.08;
    } else if (band < 0.72) {
      y = -0.28 + Math.random() * 0.22;
    } else {
      y = (Math.random() - 0.5) * 0.9;
    }

    positions[i * 3 + 0] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = 0;

    sizes[i]     = 0.6 + Math.random() * 3.0;
    opacities[i] = 0.2 + Math.random() * 0.65;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize",    new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));

  const uniforms = {
    uTime:          { value: 0 },
    uMouse:         { value: new THREE.Vector2(9999, 9999) },
    uRepelRadius:   { value: 0.18 },
    uRepelStrength: { value: 0.12 },
    uAspect:        { value: aspect },
    uColor:         { value: new THREE.Color(0xffffff) },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader:   VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return {
    scene, camera, renderer,

    resize(w: number, h: number) {
      const a = w / h;
      renderer.setSize(w, h);
      camera.left   = -a / 2;
      camera.right  =  a / 2;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = a;
    },

    setMouse(ndcX: number, ndcY: number) {
      uniforms.uMouse.value.set(ndcX * (uniforms.uAspect.value / 2), ndcY * 0.5);
    },

    clearMouse() {
      uniforms.uMouse.value.set(9999, 9999);
    },

    tick(elapsed: number) {
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    },

    dispose() {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    },
  };
}
