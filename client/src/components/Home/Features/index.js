import { FeatureList } from "../Data"
import './index.css'
function Features(){

    return(
        <div className="features-main-container">
            <div className="features-sub-container">
                <h1 className="app-main-heading">Features</h1>
                <p className="app-main-heading-3" style={{margin:"6px 0px"}}>Some of your benefits</p>
                <div className="features-card-container">
                    {
                        FeatureList.map((each)=>{
                            return(
                                <li className="features-card" key={each.id}>
                                    <div className="features-icon-container">
                                        <span className="features-icon">{each.icon}</span>
                                    </div>
                                    <div>
                                        <h1 className="app-main-heading-3">{each.title}</h1>
                                        <p className="app-pare-text">{each.description}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Features