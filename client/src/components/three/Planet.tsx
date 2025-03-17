import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { Planet as PlanetType } from "@/types";

interface PlanetProps {
  planet: PlanetType;
  size?: number;
}

export default function Planet({ planet, size = 300 }: PlanetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const planetRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js
    const container = containerRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Add stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Add camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Add renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);
    
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(5, 3, 5);
    scene.add(light);
    
    // Add planet
    const planetGeometry = new THREE.SphereGeometry(2, 64, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: planet.color,
      roughness: 0.8,
      metalness: 0.1,
    });
    
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planetMesh);
    planetRef.current = planetMesh;
    
    // Add rings for ringed planets
    if (planet.hasRings) {
      const ringGeometry = new THREE.RingGeometry(3, 5, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: planet.ringColor || 0xA79D7D,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.rotation.y = Math.PI / 8;
      planetMesh.add(ring);
    }
    
    // Add moon for Earth
    if (planet.name === "Earth") {
      const moonGeometry = new THREE.SphereGeometry(0.5, 32, 16);
      const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0xCCCCCC,
        roughness: 0.8,
      });
      
      const moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(3, 0, 0);
      scene.add(moon);
      
      // Animate moon
      const animateMoon = () => {
        const time = Date.now() * 0.001;
        moon.position.x = Math.cos(time) * 3;
        moon.position.z = Math.sin(time) * 3;
      };
      
      // Update animation function
      const animate = () => {
        animateMoon();
        planetMesh.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      // Animation loop
      const animate = () => {
        if (planetRef.current) {
          planetRef.current.rotation.y += 0.005;
        }
        
        controls.update();
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
      
      const container = containerRef.current;
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, [planet]);

  return (
    <div 
      ref={containerRef} 
      className="rounded-full overflow-hidden animate-floating" 
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
