import './index.css'

function TrustedBy(){

    const masjidUsageList = [
        {
            count:"100 +",
            category:"Masjids"
        },
        {
            count:"10 +",
            category:"Countries"
        },
        {
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
                        <div className="trusted-by-card">
                            <h1 className="app-main-heading">{each.count}</h1>
                            <p className="app-para-text">{each.category}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
export default TrustedBy