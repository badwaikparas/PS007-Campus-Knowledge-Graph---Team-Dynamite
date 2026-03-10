import ForceGraph2D from "react-force-graph"
import { useEffect, useState } from "react"
import { getGraph } from "../services/api"

export default function GraphView(){

const [graphData,setGraphData] = useState()

useEffect(()=>{

getGraph().then(data=>{
setGraphData(data)
})

},[])

if(!graphData) return <p>Loading Knowledge Graph...</p>

return(

<div className="h-[600px] bg-white rounded-xl shadow">

<ForceGraph2D graphData={graphData}/>

</div>

)

}