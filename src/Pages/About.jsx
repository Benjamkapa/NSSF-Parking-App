import React from "react";

function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto text-center items-center">
      <h1 className="text-2xl font-bold mb-4">About Parking System</h1>
      <p style={{color:'#f7f2f2ee', marginLeft:'auto', fontFamily:'Josefin Sans', paddingInline:'6rem'}}>
        It's NSSF Parking System App, a solution designed to streamline parking payments and management at The Fund. <i style={{color: 'transparent'}}> Developed by an experienced IT professional with a solid background in ICT support and a Bachelor’s in IT from Mount Kenya University [iMKAPA],</i>
      </p>
    <div style={{ position: 'fixed', width: '100%', height: '600px', overflow: 'hidden', bottom:'0', left:'0' }}>
      {/* <h1 className="text-2xl mb-4 font-thin" style={{ position: 'relative', zIndex: 2, padding: '1rem' }}></h1> */}
      <svg
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '600px', zIndex: 1 }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="smokeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(191, 214, 46)" stopOpacity="0" />
            <stop offset="100%" stopColor="rgb(1,123,59)" stopOpacity="0.8" />
          </linearGradient>
          <filter id="wavy" x="0" y="0" width="200%" height="200%">
            <feTurbulence baseFrequency="0.02 0.05" numOctaves="3" result="turbulence" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" />
            <animate
              attributeName="baseFrequency"
              dur=".5s"
              values="0.2 0.5;0.4 0.1;0.2 0.5"
              repeatCount="indefinite"
            />
          </filter>
        </defs>
        <path
          fill="url(#smokeGradient)"
          filter="url(#wavy)"
          d="M0,320 C360,280 720,360 1080,320 1440,280 1440,320 1440,320 L1440,0 L0,0 Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,320 C360,280 720,360 1080,320 1440,280 1440,320 1440,320 L1440,0 L0,0 Z;
              M0,320 C360,300 720,340 1080,300 1440,280 1440,320 1440,320 L1440,0 L0,0 Z;
              M0,320 C360,280 720,360 1080,320 1440,280 1440,320 1440,320 L1440,0 L0,0 Z
            "
          />
        </path>
      </svg>
    </div>
   </div>
  );
}

export default About;
