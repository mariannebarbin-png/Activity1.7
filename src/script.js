import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshBasicMaterial({ color: 0xff9999, wireframe: true })
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const triangleGeometry = new THREE.BufferGeometry()
const positionsArray = new Float32Array([
    0, 0, 0,    
    0, 1, 0,     
    1, 0, 0     
])

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
triangleGeometry.setAttribute('position', positionsAttribute)

const triangleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    wireframe: true 
})
const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial)
triangleMesh.position.x = 2
scene.add(triangleMesh)

const multipleTrianglesGeometry = new THREE.BufferGeometry()
const count = 50
const trianglePositionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 * 3; i++) {
    trianglePositionsArray[i] = (Math.random() - 0.5) * 4
}

const trianglePositionsAttribute = new THREE.BufferAttribute(trianglePositionsArray, 3)
multipleTrianglesGeometry.setAttribute('position', trianglePositionsAttribute)

const multipleTrianglesMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x0000ff,
    wireframe: true 
})
const multipleTrianglesMesh = new THREE.Mesh(multipleTrianglesGeometry, multipleTrianglesMaterial)
multipleTrianglesMesh.position.x = -2
scene.add(multipleTrianglesMesh)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()