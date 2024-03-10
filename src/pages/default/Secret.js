import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

const Secret = () => {
    const canvasRef = useRef();

    useEffect(() => {

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        antialias: true
      });
      renderer.setSize( window.innerWidth, window.innerHeight );

      const fps = new FirstPersonControls( camera, renderer.domElement );

      const geometry = new THREE.PlaneGeometry(6, 10);

      const texture = new THREE.TextureLoader().load("https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/269704740_3110327422514845_4349952368073477282_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=AXPTa2084WcAX-_tXt-&_nc_ht=scontent.fktm3-1.fna&oh=00_AfCychpeX0DzOZYKdvLCIBgoN0My1MRXtQLXRFkcf_JdPQ&oe=65D16A17");

      const material = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
        map: texture
      });
  
      const plane = new THREE.Mesh( geometry, material );
      plane.position.set(0, 0, -50);
      scene.add( plane );
      camera.position.set( 0, 0, 0 );

      const animate = () => {
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
      }

      animate();

    }, []);
    return (
        <canvas ref={ canvasRef }/>
    );
}

export default Secret;