import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSolarSystem } from "@/contexts/SolarSystemContext";

interface SolarSystemProps {
  onPlanetSelect: (planetId: number) => void;
}

export default function SolarSystem({ onPlanetSelect }: SolarSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  const { planets } = useSolarSystem();

  useEffect(() => {
    if (!containerRef.current || planets.length === 0) return;

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
    for (let i = 0; i < 10000; i++) {
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
    camera.position.z = 50;
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
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controlsRef.current = controls;
    
    // Add sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xFDB813,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    
    // Add light
    const light = new THREE.PointLight(0xFFFFFF, 1.5, 1000);
    light.position.set(0, 0, 0);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Add planets
    const planetObjects: THREE.Mesh[] = [];
    const planetOrbits: THREE.Line[] = [];
    
    planets.forEach((planet, index) => {
      // Create orbit path
      const orbitRadius = 10 + index * 5;
      const orbitGeometry = new THREE.BufferGeometry();
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444 });
      
      const orbitPoints = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        orbitPoints.push(
          Math.cos(angle) * orbitRadius,
          0,
          Math.sin(angle) * orbitRadius
        );
      }
      
      orbitGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(orbitPoints, 3)
      );
      
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      scene.add(orbit);
      planetOrbits.push(orbit);
      
      // Create planet
      const planetSize = 0.5 + (planet.diameter / 50000);
      const planetGeometry = new THREE.SphereGeometry(planetSize, 32, 16);
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: planet.color,
        roughness: 0.8,
        metalness: 0.1,
      });
      
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      
      // Position planet on its orbit
      const angle = Math.random() * Math.PI * 2;
      planetMesh.position.set(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      );
      
      // Add planet data as user data for raycaster
      planetMesh.userData = {
        planetId: planet.id,
        planetName: planet.name,
      };
      
      // Add rings for ringed planets
      if (planet.hasRings) {
        const ringGeometry = new THREE.RingGeometry(
          planetSize * 1.5,
          planetSize * 2.5,
          32
        );
        
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: planet.ringColor || 0xA79D7D,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        planetMesh.add(ring);
      }
      
      scene.add(planetMesh);
      planetObjects.push(planetMesh);
    });
    
    // Setup raycaster for interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const onMouseClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(planetObjects);
      
      if (intersects.length > 0) {
        const selectedPlanet = intersects[0].object;
        if (selectedPlanet.userData.planetId) {
          onPlanetSelect(selectedPlanet.userData.planetId);
        }
      }
    };
    
    container.addEventListener('click', onMouseClick);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Rotate planets
      planetObjects.forEach((planet, index) => {
        // Each planet rotates at different speed
        planet.rotation.y += 0.005 / (index + 1);
        
        // Planet orbits around the sun
        const speed = 0.002 / (index + 1);
        const angle = Date.now() * speed;
        const orbitRadius = 10 + index * 5;
        
        planet.position.x = Math.cos(angle) * orbitRadius;
        planet.position.z = Math.sin(angle) * orbitRadius;
      });
      
      controlsRef.current?.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();
    
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
      
      container.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [planets, onPlanetSelect]);

  return <div ref={containerRef} className="w-full h-96" />;
}
