import React, { useState,useRef} from "react";
import IconRoad from '../icons/road.svg';
import IconWater from '../icons/water-tap.svg';
import { LoadScript, GoogleMap, Polyline,Marker,InfoBox } from "@react-google-maps/api";


function Map(props) {
  const exampleMapStyles = [
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
            {
              visibility: "off"
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [
            {
              visibility: "off"
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
              visibility: "off"
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "labels",
        stylers: [
            {
              visibility: "off"
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels",
        stylers: [
            {
              visibility: "off"
            },
        ],
    },
];
  const {path,setPath,setpolyLengthInMeters,polyLengthInMeters,activeEl} = props;
  const [closeBtn, setCloseBtn] = useState(false)
  const [currentPolyline,setCurrentPolyline] = useState({
    name: '',
    km: '',
    description: ''
  })

  const infoboxEl = useRef(null)
  const [curPosition, setcurPosition] = useState({ lat: 42.201944, lng: 69.946944 })
  const [mapCenter,setmapCenter] = useState({ lat: 42.201944, lng: 69.946944 })

  const onLoad = (polyline) => {
    props.polyLineEl.current = polyline
  }
  const onLoadPolylines = (polyline,id) => {
    polyline.id = id
    props.polyLinesEl.current.push(polyline)
  }

  const onLoadInfoBox = (infobox) => {
    infoboxEl.current = infobox
  }
  const onEdit = () => {
    let newPath = [];
    props.polyLineEl.current.getPath().getArray().map(pos=>{
      console.log(pos)
      newPath.push({
        lat: pos.lat(),
        lng: pos.lng()
      })
      console.log(newPath)
    })
    setPath(newPath)
  }


  const getWithId = (id,array) => {
    let item = array.find(item => item.id === id);
    return item
  };
  
  const onDblClickPolyline = (event,id) => {
    const polyline = getWithId(id,props.polyLinesEl.current)
    polyline.setEditable(true)
  } 
  const onClickInfoMarker = (event,id) => {
    props.polylines.map((polyline,id) => {
      props.polyLinesEl.current[id].setOptions({
        strokeColor: polyline.color,
        strokeWeight: 2
      })
      props.polyLinesEl.current[id].setEditable(false)
    })
    

    setCloseBtn(true)
    
    const polyline = getWithId(id,props.polyLinesEl.current)
    const polylinearray = polyline.getPath().getArray()
    console.log(polylinearray)
    const curPoly = getWithId(id,props.polylines)
    setcurPosition({
      lat: polylinearray[0].lat(),
      lng: polylinearray[0].lng()
    })
    setCurrentPolyline(curPoly)

   
    
    polyline.setOptions({
      strokeColor: '#FF0000',
      strokeWeight: 4
    })
  }

  const onClick = (event) => {
    setCloseBtn(false)
    if (props.isPolyLineCreate) {
      const obj = {
        lat:  event.latLng.lat(), 
        lng:  event.latLng.lng()
      }
      setmapCenter(obj)
      let polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(props.polyLineEl.current.getPath());
      
      setPath([...path, obj]);
      setpolyLengthInMeters(parseInt(polyLengthInMeters))
    } 
    
  }
  return (
    <div className="App">
      
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE"
        language="ru"
    
      >
        <GoogleMap
        //   options={{
        //     styles: exampleMapStyles,
        //     disableDefaultUI: true,
        // }}
          mapContainerClassName="App-map"
          center={mapCenter}
          zoom={14}
          onClick={onClick}
        >
        
         {props.polylines.map(poly=>(
           <div>
             <InfoBox
              options={{ closeBoxURL: '', enableEventPropagation: true }}
              position={poly.positions[0]}
              
            >
              <div style={{ opacity: 1, padding: 5 }}>
                <div style={{width:'200px', fontSize: 14, fontColor: `#08233B`}}>
                    {poly.name}
                </div>
              </div>
          </InfoBox>
        
          <Marker
            position={poly.positions[0]}
            icon={activeEl == 1 ? IconRoad : activeEl == 2 ? IconWater : activeEl == 3 ? IconRoad : ""}
            onClick={(e)=>onClickInfoMarker(e,poly.id)}
            >
            </Marker>
            <Polyline
            options={
              {
                strokeColor: poly.color,
                strokeWeight: 2
              }
            }
            key={poly.id}
            onLoad={(polyline)=>onLoadPolylines(polyline,poly.id)}
            onDblClick={(e)=>onDblClickPolyline(e,poly.id)}
            path={poly.positions}
          />
          </div>
          ))}
          <Polyline
            onDragEnd={onEdit}
            onMouseUp={onEdit}
            // Make the Polygon editable / draggable
            editable
            onLoad={onLoad}
            path={path}
          />  
            {closeBtn ?  <InfoBox
              onLoad={onLoadInfoBox}
              options={{ closeBoxURL: '', enableEventPropagation: true }}
              position={curPosition}
            >
              <div className="infoBoxT"> 
                <div className="infoBox__name">
                Имя: {currentPolyline.name}
                </div>
                <div className="infoBox__km">
                Общая площадь:{currentPolyline.km} м
                </div>
                <div className="infoBox__description">
                Описания: {currentPolyline.description}
                </div>
              </div>
            </InfoBox> : ""} 
           
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map