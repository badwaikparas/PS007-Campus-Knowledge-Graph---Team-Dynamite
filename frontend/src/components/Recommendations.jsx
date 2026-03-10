import {useState} from "react"
import {getRecommendations} from "../services/api"

export default function Recommendations(){

const [skill,setSkill]=useState("")
const [people,setPeople]=useState([])

const recommend = async ()=>{
 const data = await getRecommendations(skill)
 setPeople(data)
}

return(

<div className="p-6">

<h2 className="text-xl font-bold">
Find Collaborators
</h2>

<input
className="border p-2 mt-2"
placeholder="Enter skill (AI, NLP)"
onChange={(e)=>setSkill(e.target.value)}
/>

<button
className="bg-green-500 text-white p-2 ml-2"
onClick={recommend}
>
Recommend
</button>

<div className="mt-4">

{people.map((p,i)=>(
<div key={i} className="border p-3 mt-2">
{p}
</div>
))}

</div>

</div>

)

}