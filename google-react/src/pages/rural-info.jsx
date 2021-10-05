import {
    Link
  } from "react-router-dom";
import village from '../icons/village.svg';
function RuralInfo() {
    const dataRural = ['Жаңаұйым ауылы', 'Аққұм ауылы', 'Момынай ауылы'
    ]

    const ozRur = [{
        id: 1,
        title: 'Ащы көшесінің жолын орташа жөндеуден өткізу',
        seshu: 'Қазіргі кезде сметалық құжаттары әзірленген, аудандық бюджеттен қаржы қарау қажет',
        natize: 'Ащы көшесіндегі  0,5 км автомобиль жолы орташа жөндеуден өткізілетін болса көлік қатынасы жақсарады.'
    },
    {
        id:2,
        title:'Ащы көшесіндегі ескірген электр бағаналарын ауыстыру',
        seshu:'Ащы көшесінің «ОңтүстікЖарықТранзит» ЖШС теңгерімінде болғандықтан осы мекеменің инвестициялық бағдарламасы аясында 2024 жылы ауыстыру жоспарлануда',
        natize:'Ащы көшесі сапалы электр қуатымен қамтамасыз етілетін болады '
    },
    {
        id:3,
        title:'Аққұм елді мекенінің ауыз су құбырын жаңарту',
        seshu:'Қазіргі таңда Аққұм елді мекеніне ауыз құбырын тарту үшін, су қорын анықтау мақсатында аталған елді мекен маңына геологиялық іздеу барлау жұмыстары жүргізілуде, 2022 жылы геологиялық іздеу барлау жұмыстарының  қорытындысы туралы хаттамасы алынып, 2022 жылы жобалау сметалық құжаттарын әзірлеуге аудандық бюджетке ұсыныс беріліп, қаржыланған жағдайда  ЖСҚ әзірленіп, осы елді мекеннің ауыз су құбырын күрделі жөндеуден өткізу үшін  тиісті салалық басқармаға қаржыландыруға ұсынылып, облыстық немесе республикалық бюджеттен қаржы қарау.',
        natize:'Аққұм елді мекенінің ауыз су құбырын күрделі жөндеуден өткізілсе аталған елді мекендегі  1620 халық және 242 тұрғын үй сапалы ауыз сумен қамтылатын болады.'
    },
    {
        id:4,
        title:'Аққұм елді мекенінің орталық көшесіне аяқ жол салу',
        seshu:'Аталған елді мекеннің орталық көшесіне аяқ жол салу үшін сметалық құжаттары әзірленіп, аудандық бюджеттен қаржы қарау.',
        natize:'Аққұм елді мекенінің орталық көшесіне аяқ жол салынатын  болса, жаяу жүргіншілердің емін еркін қатынауына жол ашылады.'
    },
]

    function displayRural() {
        return (
            dataRural.map(item=>(
                <Link to="/map" className="rectangle-grid__item">
                    <img src={village} className="rectangle-grid__icon"/>
                    <p className="rectangle-grid__text">{item}</p>
                 </Link>
            ))
        )
        
    }

    function displayRuralOz() {
        return (
            ozRur.map(item=>(
                <div className="itemRow-toped">
                <div className="itemRow ">
                    <div className="itemId">{item.id}</div>
                    <div className="itemName">{item.title}</div>
                    <div className="itemName">{item.seshu}</div>
                    <div className="itemName">{item.natize}</div>
                </div>
                </div>
            ))
        )
    }

    return ( 
        <div>
                <div className="body">
                    <div className="container">
                        <div className="body__main-title body__main-title-flex">
                            <Link className="body__main-btn" to="/">Назад</Link>
                            <p className="body__main-title-text"> Аққұм ауылдық округінің елді мекендері</p>
                        </div>
                        <div className="rectangle-grid">
                            {displayRural()}
                        </div>
                        <div className="body__oz">
                        <div className="itemRow">
                            <div className=""></div>
                            <div className="itemNameT">Өзекті мәселенің атауы</div>
                            <div className="itemNameT"> Шешу жолдары</div>
                            <div className="itemNameT">Күтілетін нәтиже</div>
                        </div>
                            {displayRuralOz()}
                        </div>
                        
                    </div>
                </div>
        </div>
     );
}

export default RuralInfo;