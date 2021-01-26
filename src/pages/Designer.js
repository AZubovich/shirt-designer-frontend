import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { 
  default_woman_shirt, 
  default_man_shirt, 
  apiURL,
  shirtColors,
} from '../constants/constants';
import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Select from 'react-select'
import { MDBInput } from "mdbreact";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Designer () {

  useEffect(() => {
    if(!canvas)
      setCanvas(initCanvas());
	});

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [canvas, setCanvas] = useState(null);
  const [isFemale, setIsFemale] = useState(false);
  const [textColor, setTextColor] = useState(null);
  const [backgroundTextColor, setBackgroundTextColor] = useState(null);
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  const renderErrors = () => {
    if (errors === null) return null;
    return Object.entries(errors).map(([k, v]) => (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" key={`${k} ${v}`}>
        <strong>Error:</strong> {k} {''} {v}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
       </div>
    ));
  };

  const initCanvas = () => {
    var canvas = new fabric.Canvas('c');
    setBackgroundImage(canvas, default_man_shirt);
    return canvas;
  };

  const setBackgroundImage = (canvas, src, color=null) => {
    var imgEl = document.createElement('img');
    imgEl.crossOrigin = 'anonymous';
    imgEl.onload = function() {
      var image = new fabric.Image(imgEl);
      image.filters = [new fabric.Image.filters.HueRotation()];
      image.filters[0].rotation = color;
      image.applyFilters();
      canvas.requestRenderAll();
      canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
    }
    imgEl.src = src;
  }

  const changeBackground = (image) => { 
    setBackgroundImage(canvas, image);
    setCanvas(canvas);
  }

  const setMale = () => {
    setIsFemale(false);
    changeBackground(default_man_shirt);
  };

  const setFemale = () => {
    setIsFemale(true);
    changeBackground(default_woman_shirt);
  };


  const addText = () => {
    var text = new fabric.IText('Add text', { left: 40, top: 100 });
    setCanvas(canvas.add(text).setActiveObject(text));
  };

  const deleteObject = () => {
    setCanvas(canvas.remove(canvas.getActiveObject()));
  };

  const changeColor = (e) => {
    var src = isFemale ? default_woman_shirt : default_man_shirt
    //var color = 2 * Math.random() - 1;
    var color = e.value;
    console.log(color);
    setBackgroundImage(canvas, src, color);
  };

  const imageUpload = (e) => {
    var t_canvas = canvas;
    var reader = new FileReader();
    reader.onload = function (event){
      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        var image = new fabric.Image(imgObj);
        image.filters.push(new fabric.Image.filters.Resize({scaleX: 0.1, scaleY: 0.1 }));
        t_canvas.centerObject(image);
        t_canvas.add(image);
        t_canvas.renderAll();
        setCanvas(t_canvas);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  const sendShirt = () => {
    //var model = JSON.stringify(canvas);
    var model = canvas.toSVG();
    //var image = new Image();
    //image.src = canvas.toDataURL("png");
    //console.log(image);
    console.log(canvas.toDataURL("png"));
    axios.post(`${apiURL}shirts`, 
         { title: title, description: description, price: parseFloat(price), model: 'fd', image: canvas.toDataURL("png")})
         .then((res) => {
           history.push('/');
         })
         .catch((err) => {
            console.log(err.response);
            //setErrors(err.response.data.errors);
         });
  };

  function setStyle(object, styleName, value) {
    if (object.setSelectionStyles && object.isEditing) {
        var style = { };
        style[styleName] = value;
        object.setSelectionStyles(style).setCoords();
    }
    else {
        object[styleName] = value;
    }
    canvas.renderAll();
  };


  function addHandler(id, fn, eventName) {
    document.getElementById(id)[eventName || 'onclick'] = function() {
        var el = this;
        var obj = canvas.getActiveObject()
        if (obj) {
            fn.call(el, obj);
            canvas.renderAll();
        }
    };
  };  

  const textColorChange = (e) => {
    addHandler('color', function(obj) {
      setStyle(obj, 'fill', e.target.value);
    }, 'onchange');
    setTextColor(e.target.value);
  };

  const textBackgroundColorChange = (e) => {
    addHandler('bg-color', function(obj) {
      setStyle(obj, 'textBackgroundColor', e.target.value);
    }, 'onchange');
    setBackgroundTextColor(e.target.value);
  };

  const createShirt = () => {
    sendShirt();
  };

  return (
    <div className="designer-page">
      <Header />
      <div className="designer">
        {renderErrors()}
        <div className="designer-form">
          <MDBInput 
            label="Shirt title"
            value={title}
            onChange={e => setTitle(e.target.value)} 
            outline
          />
          <MDBInput
            type="textarea"
            label="Shirt description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            outline 
          />
          <MDBInput 
            label="Shirt price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            outline
          />
        </div>
        <Button variant="primary" onClick={setMale}>Male</Button>
        <Button variant="primary" onClick={setFemale}>Female</Button>
        <Select options={shirtColors} onChange={changeColor} />
        <div>
          <label>Color:</label>
          <input type="color" value={textColor} id="color" size="10" onChange={textColorChange} />
          <label>Background color:</label>
          <input type="color" value={backgroundTextColor} id="bg-color" size="10" onChange={textBackgroundColorChange} />
        </div>
        <canvas className="canvas" width="580" height="580" id="c"></canvas>
        <Button variant="success" onClick={createShirt}>Create</Button>
        <Button variant="primary" onClick={addText}>Add text</Button>
        <Button variant="primary" onClick={deleteObject}>Delete object</Button>
        <input type="file" id="imgLoader" accept="image/*" onChange={imageUpload} />       
      </div>
    </div>
  );
}

export default Designer;