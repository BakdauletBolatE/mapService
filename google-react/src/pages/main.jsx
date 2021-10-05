import {
    Link
  } from "react-router-dom";
import village from '../icons/village.svg';
function MainPage() {
    const dataRural = ['Алатау ауылдық округі','Аққұм ауылдық округі','Бірінші мамыр ауылдық округі',
                        'Жоғарғы Ақсу ауылдық округі','Зертас ауылдық округі','Кемеқалған ауылдық округі',
                        'Киелітас ауылдық округі','Көксәйек ауылдық округі','Қаратөбе ауылдық округі',
                        'Қасқасу ауылдық округі','Қоғалы ауылдық округі','Ленгер қалалық әкімдігі','Тасарық ауылдық округі'
    ]

    function displayRural() {
        return (
            dataRural.map(item=>(
                <Link to='rural-info/' className="rectangle-grid__item">
                    <img src={village} className="rectangle-grid__icon"/>
                    <p className="rectangle-grid__text">{item}</p>
                 </Link>
            ))
        )
        
    }
    return ( 
        <div className="body">
                    <div className="container">
                        <div className="body__main-title">ТӨЛЕБИ АУДАНЫның Округтері</div>
                        <div className="rectangle-grid">
                            {displayRural()}
                        </div>
                    </div>
        </div>
     );
}

export default MainPage;