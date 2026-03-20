// src/components/Logo3D.js
'use client'

import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/* -------------------------
   Helpers: center, scale, float
   Works with a scene (GLTF) or a plain Object3D
------------------------- */
function collectMeshesFromObject(obj) {
  const meshes = []
  if (!obj) return meshes
  obj.traverse((c) => {
    if (c.isMesh) meshes.push(c)
  })
  return meshes
}

function prepareMeshesForCentering(objLike, { targetSize = 1.6, groundY = -0.64, floatHeight = 1.0 } = {}) {
  // objLike might be a gltf (with .scene) or an Object3D
  const root = objLike.scene ? objLike.scene : objLike
  // clone to avoid mutating original loader cache
  const clone = root.clone ? root.clone(true) : root
  const meshes = collectMeshesFromObject(clone)
  clone.updateMatrixWorld(true)

  for (const mesh of meshes) {
    const geom = mesh.geometry
    if (!geom) continue
    mesh.updateMatrixWorld(true)
    const m = mesh.matrixWorld.clone()

    if (geom.applyMatrix4) geom.applyMatrix4(m)
    mesh.matrix.identity()
    mesh.matrixAutoUpdate = false

    if (geom.attributes && geom.attributes.normal) {
      const normalMatrix = new THREE.Matrix3().getNormalMatrix(m)
      const normals = geom.attributes.normal.array
      const v = new THREE.Vector3()
      for (let i = 0; i < normals.length; i += 3) {
        v.set(normals[i], normals[i + 1], normals[i + 2]).applyMatrix3(normalMatrix).normalize()
        normals[i] = v.x; normals[i + 1] = v.y; normals[i + 2] = v.z
      }
      geom.attributes.normal.needsUpdate = true
    } else {
      geom.computeVertexNormals()
    }
  }

  const globalBox = new THREE.Box3()
  for (const mesh of meshes) {
    const pos = mesh.geometry.getAttribute('position')
    if (pos) globalBox.union(new THREE.Box3().setFromBufferAttribute(pos))
  }

  const center = globalBox.getCenter(new THREE.Vector3())
  for (const mesh of meshes) mesh.geometry.translate(-center.x, -center.y, -center.z)

  const bbox = new THREE.Box3()
  for (const mesh of meshes) {
    const pos = mesh.geometry.getAttribute('position')
    if (pos) bbox.union(new THREE.Box3().setFromBufferAttribute(pos))
  }

  const size = bbox.getSize(new THREE.Vector3())
  const maxSide = Math.max(size.x, size.y, size.z)
  const scale = maxSide > 0 ? targetSize / maxSide : 1
  for (const mesh of meshes) mesh.geometry.scale(scale, scale, scale)

  const bbox2 = new THREE.Box3()
  for (const mesh of meshes) {
    const pos = mesh.geometry.getAttribute('position')
    if (pos) bbox2.union(new THREE.Box3().setFromBufferAttribute(pos))
  }
  const minY = bbox2.min.y
  const desiredBaseY = groundY + floatHeight
  const deltaY = desiredBaseY - minY
  for (const mesh of meshes) mesh.geometry.translate(0, deltaY, 0)

  return meshes.map(m => ({ geometry: m.geometry, uuid: m.uuid }))
}

/* -------------------------
   Fire aura shader
------------------------- */
function createFireMaterial() {
  const vertex = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uIntensity;
    void main() {
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      vNormal = normalize(normalMatrix * normal);

      float n = sin(position.x * 3.0 + uTime * 3.0) * 0.12;
      n += sin(position.y * 6.0 + uTime * 2.0 + position.z * 2.0) * 0.06;
      n += 0.03 * sin((position.x + position.y + position.z) * 8.0 + uTime * 6.0);
      float disp = n * uIntensity;

      vec3 newPosition = position + normal * disp;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `
  const fragment = `
    precision highp float;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uIntensity;
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;

    float pnoise(vec3 p) {
      return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453 + uTime * 0.02);
    }

    void main() {
      vec3 p = vPosition * 2.0;
      float facing = clamp(dot(normalize(vNormal), vec3(0.0,1.0,0.0)) * .75 + .25, 0., 1.);
      float upBias = smoothstep(-1.0, 1.5, vPosition.y);
      float n = pnoise(vec3(p.x*1.5 + uTime*.9, p.y*2.0, p.z*1.2));
      float flicker = 0.6 + 0.4 * sin(uTime*8.0 + length(p)*6.0);
      float flame = smoothstep(.12, .75, n*flicker*upBias*(.8 + .6*facing)*uIntensity);

      vec3 col = mix(uColorOuter, uColorInner, clamp(1.4 * flame, 0., 1.));
      float glow = flame * (0.8 + 0.6 * sin(uTime*5.0 + length(p)*2.0));
      vec3 outCol = col * (0.6 + 0.8 * glow);

      gl_FragColor = vec4(outCol, flame * 0.92);
    }
  `
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uColorInner: { value: new THREE.Color(0x9be8ff) },
      uColorOuter: { value: new THREE.Color(0x062a45) }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  })
}

/* -------------------------
   Fire shell
------------------------- */
function FireShell({ meshes }) {
  const mat = useMemo(() => createFireMaterial(), [])

  useFrame((state) => {
    if (mat && mat.uniforms) mat.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <group>
      {meshes.map(m => (
        <mesh key={m.uuid + '-fire'} geometry={m.geometry} material={mat} />
      ))}
    </group>
  )
}

/* -------------------------
   Rotating model with GLB input and auto-fit camera
------------------------- */
function RotatingModel({ path = '/models/base_optimized.glb', rotationDuration = 8 }) {
  const gltf = useLoader(GLTFLoader, path)
  const groupRef = useRef()
  const { camera, size: viewportSize } = useThree()

  const prepared = useMemo(() => {
    if (!gltf) return []
    return prepareMeshesForCentering(gltf, { targetSize: 1.6, groundY: -0.64, floatHeight: 1.0 })
  }, [gltf])

  // Auto-fit camera whenever prepared meshes or viewport changes
  useEffect(() => {
    if (!prepared || prepared.length === 0) return
    const bbox = new THREE.Box3()
    prepared.forEach((m) => {
      const pos = m.geometry.getAttribute('position')
      if (pos) bbox.union(new THREE.Box3().setFromBufferAttribute(pos))
    })
    if (!bbox.isEmpty()) {
      const center = bbox.getCenter(new THREE.Vector3())
      const s = bbox.getSize(new THREE.Vector3())
      const maxSide = Math.max(s.x, s.y, s.z)
      // compute distance so model fits comfortably
      const fov = (camera.fov || 50) * (Math.PI / 180)
      const distance = (maxSide * 0.5) / Math.tan(fov / 2) * 1.25
      // position camera on z axis relative to center
      camera.position.set(center.x, center.y + Math.max(0.12, s.y * 0.12), center.z + distance)
      camera.near = Math.max(0.01, distance / 1000)
      camera.far = Math.max(100, distance * 10)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }
  }, [prepared, camera, viewportSize])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const angularSpeed = (Math.PI * 2) / Math.max(0.1, rotationDuration)
    groupRef.current.rotation.y += angularSpeed * delta
  })

  if (!prepared || prepared.length === 0) return null

  const baseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xeaf6ff),
    roughness: 0.2,
    metalness: 0
  }), [])

  return (
    <group ref={groupRef}>
      {prepared.map(m => (
        <mesh key={m.uuid} geometry={m.geometry} material={baseMat} />
      ))}
      <FireShell meshes={prepared} />
    </group>
  )
}

/* -------------------------
   Placeholder while loading
------------------------- */
function ModelPlaceholder() {
  const r = useRef()
  useFrame(() => { if (r.current) r.current.rotation.y += 0.02 })
  return (
    <mesh ref={r}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial color={0x0fb3ff} transparent opacity={0.8} />
    </mesh>
  )
}

/* -------------------------
   MAIN COMPONENT
   - Canvas fills parent. Parent controls size and placement.
   - Default GLB path: /models/base_optimized.glb
------------------------- */
export default function Logo3D({ glbPath = '/models/base_optimized.glb' }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.7} position={[3, 5, 2]} />

        <Suspense fallback={<ModelPlaceholder />}>
          <RotatingModel path={glbPath} />
        </Suspense>
      </Canvas>
    </div>
  )
}
