export const Card = (props) => {
    return(
        <div className="stats shadow h-48">
  
            <div className="stat">
                <div className="stat-title">{props.title}</div>
                <div className="font-bold text-2xl">{props.value}</div>
            </div>
        
        </div>
    )
}