// filepath: c:\Users\openc\Videos\inhouse\SolarSystemExplorer\client\src\components\ar\ARViewer.tsx
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useToast } from "../../hooks/use-toast";
import { useMobile } from "../../hooks/use-mobile";

interface ARViewerProps {
  objectName: string;
  modelPath: string;
  scale?: number;
}

const ARViewer = ({ objectName, modelPath, scale = 1 }: ARViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMobile();
  const { toast } = useToast();

  useEffect(() => {
    if (!containerRef.current) return;

    // Check AR support
    if (navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setIsARSupported(supported);
        if (!supported) {
          toast({
            title: "AR Not Supported",
            description:
              "Your device doesn't support AR features. You can still view 3D models in regular view.",
            variant: "destructive",
          });
        }
      });
    } else {
      setIsARSupported(false);
      toast({
        title: "AR Not Supported",
        description:
          "Your browser doesn't support WebXR. Try using a modern mobile browser like Chrome or Safari.",
        variant: "destructive",
      });
    }

    // Configure three.js scene
    const scene = new THREE.Scene();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    // Add camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;

    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Add AR button if supported
    if (isARSupported) {
      const arButton = ARButton.createButton(renderer);
      containerRef.current.appendChild(arButton);
    }

    // Load the 3D model
    const loader = new GLTFLoader();
    let model: THREE.Group;

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(scale, scale, scale);
        scene.add(model);
        setIsLoading(false);
      },
      (progress) => {
        console.log(
          `Loading model: ${(progress.loaded / progress.total) * 100}%`
        );
      },
      (error) => {
        console.error("Error loading model:", error);
        toast({
          title: "Error Loading Model",
          description: `Could not load the 3D model for ${objectName}.`,
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      renderer.setAnimationLoop(() => {
        if (model) {
          model.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      });
    };

    animate();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        const arButton = containerRef.current.querySelector("button");
        if (arButton) containerRef.current.removeChild(arButton);
      }
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
    };
  }, [modelPath, objectName, scale, isARSupported, toast]);

  if (!isMobile) {
    return (
      <div className="rounded-lg bg-slate-100 dark:bg-slate-800 p-4 text-center">
        <h3 className="text-lg font-medium mb-2">AR Viewing</h3>
        <p>
          Augmented Reality is only available on mobile devices. Please open
          this page on your smartphone or tablet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="ar-container h-[600px] w-full relative rounded-lg overflow-hidden"
      ref={containerRef}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="loader">Loading 3D Model...</div>
        </div>
      )}
      <div className="absolute bottom-4 left-0 right-0 text-center bg-black/60 text-white py-2 px-4 mx-4 rounded-lg z-10">
        <p>
          {isARSupported
            ? "Tap the AR button to view in your space"
            : "AR not supported on this device"}
        </p>
      </div>
    </div>
  );
};

export default ARViewer;
