import './index.css'

function TrustedBy(){

    const masjidUsageList = [
        {
            id:"1",
            count:"100 +",
            category:"Masjids"
        },
        {
            id:"2",
            count:"10 +",
            category:"Countries"
        },
        {
            id:"3",
            count:"40 +",
            category:"Cities"
        }
    ]

    return(
        <div className="trusted-by-main-container">
            <h1 className="app-main-heading" style={{textAlign:"center",marginBottom:"4px"}}>Trusted By</h1>
            <div className="trusted-by-card-container">
            {
                masjidUsageList.map((each)=>{
                    return(
                        <li className="trusted-by-card" key={each.id}>
                            <h1 className="app-main-heading">{each.count}</h1>
                            <p className="app-para-text">{each.category}</p>
                        </li>
                    )
                })
            }
            </div>
        </div>
    )
}
export default TrustedBy