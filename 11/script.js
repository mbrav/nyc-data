var camera, scene,renderer;
var cube,group;
var groups = [];
var pointLight;

// data file
var dataSets;
var scale = 0.002; //   scale/n

// fly over control
var controls;
var clock = new THREE.Clock();

init();
animatedRender();

function init() {
    dataSets = {
      farmerMarketsCords,
      waterQualityComplaints,
      greenthumbCommunityGardens,
      coolRoofs,
      foodScrapSites,
      projectsInConstruction,
      nycDomainRegistrations,
      wholesaleMarkets,
      publicRecyclingBins,
      healthHospitalFacilities
    };

    var viewAngle = 75;
    var aspectRatio = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 10000;
    camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    // light
    pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.z = 10;
    camera.position.x = 20380.988243112966;
    camera.position.y = -36974.9998374725;
    camera.position.z = -100;
    camera.rotation.x = Math.PI;
    camera.rotation.z = -Math.PI/2;

    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 30;
    controls.domElement = container;
    controls.rollSpeed = 0.2;
    controls.autoForward = false;
    controls.dragToLook = false;

    // fog and background
    scene.fog = new THREE.Fog(0xffffff, near, 600);
    var skyColor = new THREE.Color(1.0, 1.0, 1.0);
    renderer.setClearColor(skyColor, 1.0);

    // create geometries out of data
    console.log("LOADING datasets...");
    generateData01();
    generateData02();
    generateData03();
    generateData04();
    generateData05();
    generateData06();
    generateData07();
    generateData08();
    generateData09();
    generateData10();

    // add in all the geopmtery groups
    for (var i = 0; i < groups.length; i++) {
      scene.add(groups[i]);
    }

    scene.add(pointLight);
    scene.add(camera);
}


function animatedRender() {
    requestAnimationFrame(animatedRender);
    var delta = clock.getDelta();
    controls.update(delta);

    renderer.render(scene, camera);

    // animate the data that is animated
    animateGenerateData01();
    animateGenerateData06();
    animateGenerateData09();

}

function generateData01() {

  // specify data set
  var data = dataSets.healthHospitalFacilities;
  console.log("Data length: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    emissive: 0x8de564,
    emissiveIntensity: 0.5,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  var coneHeight = 5;
  for (var i = 0; i < data.length; i++) {
    geometry = new THREE.ConeBufferGeometry( 1, coneHeight, 20 );

    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = -Math.PI/2;
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = -coneHeight/2;

    // cube.updateMatrix();
    group.add(cube);
  }
  groups.push(group);
}

function generateData02() {

  // specify data set
  var data = dataSets.waterQualityComplaints;
  console.log("Data length: " + data.length);
  var geometry = new THREE.SphereGeometry( 0.5, 5, 5 );
  var material = new THREE.MeshStandardMaterial({
    emissive: 0x2f88d6,
    emissiveIntensity: 1.0,
    opacity: 0.6,
    transparent: true,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    // cube.updateMatrix();
    group.add(cube);
  }
  groups.push(group);
}

function generateData03() {

  // specify data set
  var data = dataSets.greenthumbCommunityGardens;
  console.log("Data length: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    color: 0xf9fc79,
    emissive: 0xf9fc79,
    emissiveIntensity: 0.5,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    var geometry = new THREE.CylinderGeometry( 1, 1, 1, 32 );
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI/2;
    cube.position.x = data[i].location.lat/scale;
    cube.position.y = data[i].location.lng/scale;
    cube.position.z = 0;

    // cube.updateMatrix();
    group.add(cube);
  }
  groups.push(group);
}

function generateData04() {

  // specify data set
  var data = dataSets.coolRoofs;
  console.log("Data length: " + data.length);
  var geometry = new THREE.BoxGeometry(1, 1, 0.4);
  var material = new THREE.MeshStandardMaterial({
    emissive: 0x6a6ee8,
    emissiveIntensity: 0.5,
    opacity: 1.0,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    // cube.updateMatrix();
    group.add(cube);

  }
  groups.push(group);
}

function generateData05() {

  // specify data set
  var data = dataSets.foodScrapSites;
  console.log("Data length: " + data.length);
  var geometry = new THREE.IcosahedronBufferGeometry(1, 0)
  var material = new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    emissive: 0x890779,
    emissiveIntensity: 0.7,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {

    cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI/2;
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    // cube.updateMatrix();
    group.add(cube);

  }
  groups.push(group);
}

function generateData06() {

  // specify data set
  var data = dataSets.projectsInConstruction;
  console.log("Data length: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    wireframe: true,
    wireframeLinewidth: 2,
    vertexColors: THREE.FaceColors,
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    var randomHeight =  Math.random()*5 + 4;
    geometry = new THREE.BoxGeometry(0.5, 0.5, randomHeight);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = -randomHeight/2;

    group.add(cube);

  }
  groups.push(group);
}

function generateData07() {

  // specify data set
  var data = dataSets.nycDomainRegistrations;
  console.log("Data length: " + data.length);
  var material = new THREE.MeshStandardMaterial({
    vertexColors: THREE.FaceColors,
    wireframe: false,
    opacity: 0.1,
    transparent: true
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    var height = data[i].info.count/100;
    var geometry = new THREE.BoxGeometry(2 + data[i].info.count/500, 2 + data[i].info.count/500, height);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].location.lat/scale;
    cube.position.y = data[i].location.lng/scale;
    cube.position.z = -height/2;

    group.add(cube);

  }
  groups.push(group);
}

function generateData08() {

  // specify data set
  var data = dataSets.wholesaleMarkets;
  console.log("Data length: " + data.length);
  var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  var material = new THREE.MeshStandardMaterial({
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    group.add(cube);

  }
  groups.push(group);
}

function generateData09() {

  // specify data set
  var data = dataSets.publicRecyclingBins;
  console.log("Data length: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    color: 0xb9fc99,
    emissive: 0xb9fc99,
    emissiveIntensity: 0.5,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    geometry = new THREE.TorusKnotBufferGeometry( 0.5, 0.15, 24, 8 );

    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;


    // random rotation when generated
    cube.rotation.x = Math.random() * Math.PI*2

    // cube.updateMatrix();
    group.add(cube);

  }
  groups.push(group);
}


function generateData10() {

  // specify data set
  var data = dataSets.farmerMarketsCords;
  console.log("Data Lenght: " + data.length);
  var geometry;
  var material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 0.6,
    vertexColors: THREE.FaceColors,
    wireframe: false
  });

  var group = new THREE.Group();
  for (var i = 0; i < data.length; i++) {
    geometry = new THREE.BoxGeometry(0.7, 3, 1);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    group.add(cube);

    geometry = new THREE.BoxGeometry(3, 0.7, 1);
    cube = new THREE.Mesh(geometry, material);
    cube.position.x = data[i].lat/scale;
    cube.position.y = data[i].lng/scale;
    cube.position.z = 0;

    group.add(cube);
  }
  groups.push(group);
}

function animateGenerateData01() {
  for (var i = 0; i < groups[1].children.length; i++) {

    var pos = groups[1].children[i].position;

    groups[1].children[i].position.z = Math.cos(clock.elapsedTime + pos.x/2) * Math.sin(clock.elapsedTime + pos.y/2)* 1;

  }
}

function animateGenerateData06() {
  for (var i = 0; i < groups[5].children.length; i++) {

    var pos = groups[6-1].children[i].position;

    groups[6-1].children[i].scale.z = Math.cos(clock.elapsedTime + pos.x/6) * Math.sin(clock.elapsedTime + pos.y/8)* 2;

  }
}

function animateGenerateData09() {
  for (var i = 0; i < groups[8].children.length; i++) {

    var pos = groups[8].children[i].position;

    groups[8].children[i].rotation.x += 0.01;
    groups[8].children[i].rotation.y += 0.01;
    groups[8].children[i].rotation.z += 0.01;

  }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
