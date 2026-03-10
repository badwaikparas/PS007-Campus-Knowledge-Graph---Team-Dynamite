import ForceGraph2D from "react-force-graph-2d"
import { useEffect, useState } from "react"
import { getGraph } from "../services/api"

export default function GraphView(){

const [graphData,setGraphData] = useState(null)

useEffect(()=>{

getGraph().then(data=>{
setGraphData(data)
})

},[])

if(!graphData) return <p>Loading Knowledge Graph...</p>

return(

<div style={{height:"600px"}}>

<ForceGraph2D graphData={graphData}/>

</div>

)

}