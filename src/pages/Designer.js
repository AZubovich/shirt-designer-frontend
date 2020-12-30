import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { default_woman_shirt } from '../constants/constants'
import Header from '../components/Header';

function Designer () {

  useEffect(() => {
    setCanvas();
	});

  const setCanvas = () =>{
    var canvas = new fabric.Canvas('c');
    canvas.setBackgroundImage(default_woman_shirt, canvas.renderAll.bind(canvas));
  };

  return (
    <div className="designer-page">
      <Header />
      <div className="designer">
        <h1>Hi, everyone. This a Designer</h1>
        <canvas width="580" height="580" id="c"></canvas>
      </div>
    </div>
  );
}

export default Designer;