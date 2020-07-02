// import * as dat from './js/dat.gui.min.js'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

//make window be able to be resized sans gene
window.addEventListener( 'resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0,1,1 ).normalize();
scene.add(light);

var geometry = new THREE.SphereGeometry(5,100,100);
var material = new THREE.MeshPhongMaterial({
    color : 0xFE98A0,
    flatShading : true
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//axisHelper
var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );


camera.position.z = 100;
camera.position.x = 100;
camera.position.y = 100;
camera.lookAt(scene.position);


//dat.gui objects
// var guiControls_X = new function(){
//     this.b = 0;
//     this.k = 10;
// };

// var guiControls_Y = new function(){
//     this.b = 0;
//     this.k = 20;
// };

// var guiControls_Z = new function(){
//     this.b = 0;
//     this.k = 30;
// };

var guiMass = 100;

var R = 1;
var l = 5;
var L = 10;

const chi = 2;
const n = 100;
const I = 10;
const pi = 3.14;
const a = 0.5;

var colour =  {
    color: 0xFE98A0
};

// var gui = new dat.GUI();
// let gui_X = gui.addFolder('X_motion');
// let gui_Y = gui.addFolder('Y_motion');
// let gui_Z = gui.addFolder('Z_motion');

// gui.add(guiMass, 'm' , 0.1, 10);

// gui_X.add(guiControls_X, 'R',0,10);
// gui_X.add(guiControls_X, 'L',0,100);
// gui_X.add(guiControls_X, 'l',0,100);

// gui_Y.add(guiControls_Y, 'b',0,10);
// gui_Y.add(guiControls_Y, 'k',0,100);

// gui_Z.add(guiControls_Z, 'b',0,10);
// gui_Z.add(guiControls_Z, 'k',0,100);

// gui.addColor( colour, 'color' ).onChange( function() { sphere.material.color.set( colour.color ); } );


function Data(location, accel, vel){
    this.location = location;
    this.accel = accel;
    this.vel = vel;
};

const dt = 0.025;

//define X,Y,Z
let X = new Data(0,0,0);
let Y = new Data(0,0,0);
let Z = new Data(0,0,0);

sphere.position.set(X.location,Y.location,Z.location);

//draw scene
var render = function(){
    renderer.render(scene,camera);
};

//game loop
var GameLoop = function(){

    requestAnimationFrame(GameLoop);

    X.vel += X.accel*dt;
    sphere.position.x += X.vel * dt;
    X.location = sphere.position.getComponent(0);
    X.accel = ( (chi*n*I*pi*Math.pow(a,2))/(2) *( ((X.location / Math.pow((Math.pow(R,2) + Math.pow(X.location, 2)),0.5)) - (X.location - R)/(Math.pow(( Math.pow((X.location - L),2) + R*R) ,0.5)) ) * ( -(l-L+X.location)/(Math.pow(Math.pow(l-L+X.location,2)+R*R , 0.5)) + 1/(Math.pow(1+Math.pow(R/(l+X.location),2),0.5)) + 1/(Math.pow((1 + Math.pow(R/(X.location-L),2)),0.5)) - 1/(Math.pow(1+(Math.pow(R/X.location , 2)),0.5))) + ( -1/(Math.pow((Math.pow(X.location - L,2) + R*R),0.5)) + (Math.pow(X.location-L,2))/(Math.pow((Math.pow(X.location-L , 2)+R*R),1.5)) - Math.pow(X.location,2)/(Math.pow(R*R + X.location * X.location,1.5)) +  1/(Math.pow(1+ Math.pow(R/X.location ,2),0.5)) ) * ( -Math.pow(Math.pow(l-L+X.location,2) + R*R,0.5) + Math.pow(Math.pow(l+X.location,2) + R*R,0.5) + Math.pow(Math.pow(X.location-L,2)+R*R,0.5) - Math.pow(R*R + X.location * X.location,0.5)  )  )  )/guiMass;

    

    render();
}

GameLoop();