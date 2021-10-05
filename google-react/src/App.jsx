import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './scss/style.scss';
import headerMap from './icons/location.svg';
import RuralInfo from './pages/rural-info';
import MainPage from './pages/main';
import MapPage from './pages/map-page';
function App() {
    return ( 
        <div>
            <Router>
            <div className="main">
                <div className="header container">
                    <div className="header__map">
                        <img className="header__map-img" src={headerMap} alt="" />
                        <p className="header__map-text">Цифрлық карта</p>
                    </div>
                    <Link to='/' className="header__main-title">Төлеби ауданы</Link>
                    <div className="header__nav">
                        <div className="header__nav-item"><a href="" className="header__nav-link">Біз жайлы</a></div>
                        <div className="header__nav-item"><a href="" className="header__nav-link">Өзекті мәселелер</a></div>
                        <div className="header__nav-item"><a href="" className="header__nav-link">Контакты</a></div>
                    </div>
                </div>
            </div>
                <Switch>
                <Route path="/rural-info">
                    <RuralInfo></RuralInfo>
                </Route>
                <Route path="/map">
                    <MapPage></MapPage>
                </Route>
                <Route path="/">
                    <MainPage></MainPage>
                </Route>
                
                </Switch>
            </Router>
        </div>

        

     );
}

export default App;

