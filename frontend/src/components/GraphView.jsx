import ForceGraph2D from "react-force-graph"
import {useEffect,useState} from "react"
import {getGraph} from "../services/api"

export default function GraphView(){

const [data,setData]=useState()

useEffect(()=>{

getGraph().then(setData)

},[])

if(!data) return <p>Loading graph...</p>

return(

<div className="h-[500px]">

<ForceGraph2D
graphData={data}
/>

</div>

)

}