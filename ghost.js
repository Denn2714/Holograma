import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

//Se instancian las variables
    let container;
    let MyObj;
    let camera, scene, renderer, effect;

//Se crea un contenedor
    container = document.createElement( 'div' );

    document.body.appendChild( container );

//render

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

//Se crea el efecto PeppersGhost
    effect = new PeppersGhostEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.cameraDistance = 5;

    window.addEventListener( 'resize', onWindowResize );
//Camara
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
//Escena
    scene = new THREE.Scene();

//Ajuste a pantalla

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    effect.setSize( window.innerWidth, window.innerHeight );

}

//Comenzamos con el fbx
const fbxloader = new FBXLoader ()
fbxloader.load(
    'tails.fbx',
    (object) => {
    MyObj = object;
    MyObj.scale.set(2.1,2.1,2.1);
    MyObj.position.set(0,0,0);
    scene.add(MyObj);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error);
    }
)
    // Animaciones
    function animate() {
        if (MyObj){
            MyObj.rotation.y +=0.01;
           }
    effect.render( scene, camera );
    
    }