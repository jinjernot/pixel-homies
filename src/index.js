import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
} from "webgi";
import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pane } from "tweakpane";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: ".mainContainer" });

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas"),
    useRgbm: false,
    isAntialiased: true,
  });
  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  // const data = {
  //   position: { x: 0, y: 0, z: 0 },
  //   rotation: { x: 0, y: 0, z: 0 },
  // };

  // const pane = new Pane();

  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const camera = viewer.scene.activeCamera;

  // Add plugins individually.
  await viewer.addPlugin(GBufferPlugin);
  await viewer.addPlugin(new ProgressivePlugin(32));
  // await viewer.addPlugin(new TonemapPlugin(true));
  await viewer.addPlugin(SSRPlugin);
  await viewer.addPlugin(SSAOPlugin);
  await viewer.addPlugin(BloomPlugin);

  // or use this to add all main ones at once.
  // await addBasePlugins(viewer);

  // WEBGi loader
  const importer = manager.importer;

  importer.addEventListener("onProgress", (ev) => {
    const progressRatio = ev.loaded / ev.total;
    document
      .querySelector(".progress")
      ?.setAttribute("style", `transform: scaleX(${progressRatio})`);
  });

  importer.addEventListener("onLoad", (ev) => {
    introAnimation();
  });

  viewer.renderer.refreshPipeline();

  let a = ["./assets/scene.glb","./assets/scene2.glb","./assets/scene3.glb"];
  var r = a[Math.floor(Math.random()*a.length)];
  
  const model = await manager.addFromPath(r);
  const object3d = model[0].modelObject;
  const modelPosition = object3d.position;
  const modelRotation = object3d.rotation;

  const loaderElement = document.querySelector(".loader");

  function introAnimation() {
    const introTL = gsap.timeline();
    introTL
      .to(".loader", {
        x: "150%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 1,
	onComplete: setupScrollanimation,
      })
  }

  // pane.addInput(data, "position", {
  //   x: { step: 0.01 },
  //   y: { step: 0.01 },
  //   z: { step: 0.01 },
  // });
  // pane.addInput(data, "rotation", {
  //   x: { min: -6.28319, max: 6.28319, step: 0.001 },
  //   y: { min: -6.28319, max: 6.28319, step: 0.001 },
  //   z: { min: -6.28319, max: 6.28319, step: 0.001 },
  // });

  // pane.on("change", (e) => {
  //   if (e.presetKey === "rotation") {
  //     const { x, y, z } = e.value;
  //     modelRotation.set(x, y, z);
  //   } else {
  //     const { x, y, z } = e.value;
  //     modelPosition.set(x, y, z);
  //   }

  //   onUpdate();
  // });

  function setupScrollanimation() {
    document.body.removeChild(loaderElement);
    
    const tl = gsap.timeline();

    // Starting position
    tl.to(modelPosition, {
      x: 0,
      y: 0,
      z: -1,
      scrollTrigger: {
        trigger: ".first",
        start: "top top",
        end: "top top",
        scrub: 0.2,
        immediateRender: false,
      },
      onUpdate,
    })
    //Second section - Collection
      .to(modelPosition, {
        x: 2,
        y: -.25,
        z: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: 1.2,
          immediateRender: false,
        },
        onUpdate,
      })
      .to(modelRotation, {
        x: 0,
        y: 6.1,
        z: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      //Third section - Handmade
      .to(modelPosition, {
        x: -2,
        y: -.25,
        z: 0,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })
      .to(modelRotation, {
        x: 0,
        y: 0,
        z: 0,
        scrollTrigger: {
          trigger: ".third",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      //Fourth section - Where
      .to(modelPosition, {
        x: 2,
        y: -.25,
        z: 0,
        scrollTrigger: {
          trigger: ".four",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })
      .to(modelRotation, {
        x: 0,
        y: 6.1,
        z: 0,
        scrollTrigger: {
          trigger: ".four",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      //Fifth section - Comming Soon
      .to(modelPosition, {
        x: -2,
        y: 0,
        z: 0,
        scrollTrigger: {
          trigger: ".five",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
        onUpdate,
      })
      .to(modelRotation, {
        x: 0,
        y: 2.5,
        z: 8,
        scrollTrigger: {
          trigger: ".five",
          start: "top bottom",
          end: "top top",
          scrub: 0.2,
          immediateRender: false,
        },
      })
      
      .to(".section--one--container1", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".section--one--container1",
          start: "top top",
          end: "bottom top",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(".section--one--container2", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".second",
          start: "top bottom",
          end: "top center",
          scrub: true,
          immediateRender: false,
        },
      })
      .to(".section--two--container", {
        scrollTrigger: {
          trigger: ".section--two--container",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section--three--container", {
        scrollTrigger: {
          trigger: ".section--three--container",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section--four--container", {
        scrollTrigger: {
          trigger: ".section--four--container",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      })
      .to(".section--five--container ", {
        scrollTrigger: {
          trigger: ".section--five--container ",
          start: "top 80%",
          end: "bottom center",
          toggleClass: "resetPosition",
          scrub: true,
        },
      });
  }

  // WEBGI UPDATE
  let needsUpdate = true;
  function onUpdate() {
    needsUpdate = true;
    viewer.renderer.resetShadows();
    viewer.setDirty();
  }

  // viewer.addEventListener("preFrame", () => {
  //   if (needsUpdate) {
  //     camera.positionUpdated(true);
  //     camera.targetUpdated(true);
  //     needsUpdate = false;
  //   }
  // });

  // SCROLL TO TOP
  document.querySelectorAll(".fa-arrow-up")?.forEach((item) => {
    item.addEventListener("click", () => {
      const container = document.getElementsByClassName("mainContainer");
      container[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  });
}

setupViewer();