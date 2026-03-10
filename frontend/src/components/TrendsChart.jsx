import {BarChart,Bar,XAxis,YAxis,Tooltip} from "recharts"
import {useEffect,useState} from "react"
import {getTrends} from "../services/api"

export default function TrendsChart(){

const [data,setData]=useState([])

useEffect(()=>{
 getTrends().then(setData)
},[])

return(

<BarChart width={500} height={300} data={data}>

<XAxis dataKey="skill"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="count"/>

</BarChart>

)

}