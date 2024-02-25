"use client"
import React, { useState, useEffect, useRef } from "react";

const Home = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textColor, setTextColor] = useState("#000000"); // default color black
  const [backgroundColor, setBackgroundColor] = useState("#ffffff"); // default color white
  const [fontSize, setFontSize] = useState(6); // default font size
  const [canvasWidth, setCanvasWidth] = useState(400);

  // Load previous signature from local storage on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const savedSignature = localStorage.getItem("signature");
    if (savedSignature) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = savedSignature;
    }
  }, []);

  // Save signature to local storage whenever it changes
  const saveSignature = () => {
    const canvas = canvasRef.current;
    localStorage.setItem("signature", canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveSignature();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = textColor;
    context.lineWidth = fontSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    saveSignature();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDownload = () => {
    const signatureCanvas = canvasRef.current;

    // Get the device's pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;

    // Create a temporary canvas with higher resolution
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");

    // Set the dimensions of the temporary canvas
    tempCanvas.width = signatureCanvas.width * devicePixelRatio;
    tempCanvas.height = signatureCanvas.height * devicePixelRatio;

    // Scale the context to match the device pixel ratio
    tempContext.scale(devicePixelRatio, devicePixelRatio);

    // Fill the temporary canvas with the background color
    tempContext.fillStyle = backgroundColor;
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the signature canvas onto the temporary canvas
    tempContext.drawImage(signatureCanvas, 0, 0);

    // Convert the merged canvas to a data URL and initiate the download
    const url = tempCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setCanvasWidth(400); // For mobile screens
      } 
      else if (screenWidth < 400) {
        setCanvasWidth(250); // For mobile screens
      } 
      else {
        setCanvasWidth(800); // For desktop screens
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Initial setup
    handleResize();

    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const touch = e.touches[0];
    context.beginPath();
    context.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const touch = e.touches[0];
    context.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    context.strokeStyle = textColor;
    context.lineWidth = fontSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    saveSignature();
  };

  // Function to handle touch end event
  const handleTouchEnd = () => {
    setIsDrawing(false);
  };


  return (

<div className="flex flex-col items-center justify-center">
  <div className="flex justify-between w-full"> 
  <div className="mb-4 flex flex-col gap-1 justify-betwee">
    <label htmlFor="pencil" className="text-white">Pencil </label>
    <input
      type="color"
      id="pencil"
      value={textColor}
      className="w-16 md:w-28"
      onChange={(e) => setTextColor(e.target.value)}
    />
  </div>
  <div className="mb-4 flex flex-col gap-1 justify-betwee">
    <label htmlFor="bg" className="text-white">Background</label>
    <input
      id="bg"
      type="color"
      value={backgroundColor}
      onChange={(e) => setBackgroundColor(e.target.value)}
      className="w-16 md:w-28"
    />
  </div>
  <div className="mb-4 flex flex-col gap-1 justify-between">
    <label htmlFor="fontSize" className="text-white">Font Size</label>
    <input
      id="fontSize"
      type="number"
      value={fontSize}
      onChange={(e) => setFontSize(parseInt(e.target.value))}
      className="w-16 md:w-28"
    />
  </div>
  </div>
  <canvas
    ref={canvasRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseOut={handleMouseUp}
    style={{ backgroundColor }}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    width={canvasWidth}
    height={400}
  />
  <div className="flex justify-between w-full mt-4">
    <button className="bg-[#ef4444] py-2 px-4 text-white text-base mr-2" onClick={clearCanvas}>Clear</button>
    <button className="bg-[#16a34a] py-2 px-4 text-white text-base" onClick={handleDownload}>Download</button>
  </div>
</div>

  );
};

export default Home;
