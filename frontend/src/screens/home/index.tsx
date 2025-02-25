// import React = require("react");

import React, { useEffect, useRef, useState } from "react";
import { SWATCHES } from "../../constant";
import { ColorSwatch, Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Respone {
  expr: string;
  result: string;
  assign: boolean;
}

interface GeneratedResult {
  expression: string;
  answer: string;
}

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [color, setColor] = useState("rgb(255,255,255)");
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GeneratedResult>();
  const [dictofVars, setDictofVars] = useState({});

  const ColorSwatches = SWATCHES.map((colors) => {
    return (
      <div
        key={colors}
        className="rounded-full z-20 "
        onClick={() => setColor(colors)}
      >
        <ColorSwatch color={colors} key={colors} />
      </div>
    );
  });
  useEffect(() => {
    const canvas = canvasRef.current;

    console.log("Hello", SWATCHES);

    if (reset) {
      resetCanvas();
      setReset(false);
    }
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineCap = "round"; // For Brush Type
        ctx.lineWidth = 3; // For Brush size
      }
    }
  }, [reset]);

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/calculate`,
        data: {
          image: canvas.toDataURL("image.png"),
          dict_of_vars: dictofVars,
        },
      });

      const resp = await response.data;
      console.log("Response:", resp);
    }
  };
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // const debug = () => {
  //   console.log("Hello");
  // };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        isDrawing.current = true;
      }
    }
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-between mx-10 my-5 cursor-pointer">
        <Button
          onClick={() => setReset(true)}
          className="z-20 bg-black text-white w-20 rounded-none "
          variant="default"
          color="black"
        >
          Reset
        </Button>

        <Group className="z-20">{ColorSwatches}</Group>

        <Button
          onClick={sendData}
          className="z-20 bg-black text-white cursor-pointer w-20 rounded-none"
          variant="default"
          color="black"
        >
          Calculate
        </Button>
        {/* <Button
          onClick={debug}
          className="z-20 bg-black text-white"
          variant="default"
          color="black"
        >
          Debug
        </Button> */}
      </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full "
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </>
  );
};

export default Home;
