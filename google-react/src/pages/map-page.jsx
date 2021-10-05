import React, { useState, useRef, useCallback,useEffect } from "react";
import Map from '../components/map';
import axios from "axios";


function MapPage() {
  const [isPolyLineCreate,setPolyLineCreate] = useState(false)
  const [polylines,setPolylines] = useState([])
  const [path, setPath] = useState([]);
  const [polyLengthInMeters,setpolyLengthInMeters] = useState([])

  const [activeEl,setActiveEl] = useState(1)

  const btns = [
    {
      id:1,
      title: "Жол"
    },
    {
      id:2,
      title: "Су"
    },
    {
      id:3,
      title: "Кубыр"
    }
  ]
  useEffect((state)=>{
    console.log(state);
    axios.get(`http://127.0.0.1:8000/api/polyline-types/${activeEl}`)
    .then(res=>{
      setPolylines(res.data.polyline)
    })
  },[activeEl])

  const [form,setForm] = useState({
    name: "",
    description: ""
  })


  const polyLineEl = useRef(null);
  const polyLinesEl = useRef([]);

  const updatePolylines = () => {
    console.log(polyLinesEl.current);
  }

  const onChange = (e) => {
    
    setForm({...form, [e.target.name]: e.target.value})    
    console.log(form)
  }

  const savePolyLine = () => {
    const config = {
      'Content-type':"application/json"
    }
    const {name,description} = form
    const newPath = [];
    polyLineEl.current.getPath().getArray().map(pos=>{
      newPath.push({
        lat: pos.lat(),
        lng: pos.lng()
      })
    })
    const body={
      name:name,
      description,
      km: polyLengthInMeters,
      typeMarker: activeEl,
      positions: newPath
    }
    axios.post('http://127.0.0.1:8000/api/polyline/',body,config)
    .then(res=>setPolylines([...polylines,res.data]))
    polyLineEl.current.setPath([])
    setPolyLineCreate(false)
    setPath([])
  }


  const displayInput = () => {
    const {name,description} = form
    return (
      <div className="row mt-3">
              <div className="mb-3">
                <label   className="form-label">Имя обьекта</label>
                <input type="text" name="name"  onChange={onChange} value={name} className="form-control" id="exampleFormControlInput1" placeholder="Имя обьекта"/>
              </div>
              <div className="mb-3">
                <label     className="form-label">Описания обьекта</label>
                <textarea name="description" className="form-control"value={description} onChange={onChange} id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <label   className="form-label">Километр обьекта</label>
                <input type="text" name="km"  onChange={onChange} value={polyLengthInMeters} className="form-control" id="exampleFormControlInput1" placeholder="Километр"/>
              </div>  
              <div className="mb-3">
              <div className="col-4"><button type="button" onClick={savePolyLine}  className="btn btn-success">Сохранить</button></div>
              </div>
      </div>
    )
  }

  return (
    <div>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="switch-btns" >
            {
              btns.map(btn=>(
                <div onClick={()=>setActiveEl(btn.id)} className={btn.id==activeEl ? "switch-btns__item switch-btns__item--active": "switch-btns__item"} >
                  {btn.title}
                </div>
              ))
            }

          </div>
        </div>
        <div className="col-9">    
            <Map
            disableDefaultUI={true}
             polyLineEl={polyLineEl}
             activeEl={activeEl}
                setPath={setPath}
                path={path}
                polylines={polylines}
                polyLinesEl={polyLinesEl}
                polyLengthInMeters={polyLengthInMeters}
                setpolyLengthInMeters={setpolyLengthInMeters}
                 isPolyLineCreate={isPolyLineCreate} 
                 setPolyLineCreate={setPolyLineCreate}></Map>
        </div>
        <div className="col-3 list-container">
          <div className="row mt-3">
            <div className="col-4"> <button type="button"
             className="btn btn-primary"
             onClick={()=>setPolyLineCreate(true)}
             >Создать</button></div>
             <div className="col-4"> <button type="button"
             className="btn btn-primary"
             onClick={updatePolylines}
             >Обновить</button></div>
            {isPolyLineCreate ? displayInput() : ""}
          </div>
          <div>
          <div className="row list-group mt-5">
                {polylines.map(item=>(
                  <div className="col-12 list-group-item">
                    <div className="row ">  
                    <div className="">Имя обьекта: {item.name}</div>
                    <div className="">Расстояния обьекта: {item.km} м</div>
                    <div className="">Описания обьекта: {item.description}</div>
                    </div>
                  </div>
                ))}
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
  
}

export default MapPage