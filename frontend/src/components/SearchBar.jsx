import {useState} from "react"
import {searchResearch} from "../services/api"

export default function SearchBar(){

const [query,setQuery]=useState("")
const [results,setResults]=useState([])

const search = async ()=>{
 const data = await searchResearch(query)
 setResults(data)
}

return(

<div className="p-6">

<input
className="border p-2 w-80"
placeholder="Search research, skills, publications..."
onChange={(e)=>setQuery(e.target.value)}
/>

<button
className="bg-blue-500 text-white p-2 ml-2"
onClick={search}
>
Search
</button>

<div className="mt-4">

{results.map((r,i)=>(
<div key={i} className="border p-3 mt-2">
{r[0]}
</div>
))}

</div>

</div>

)

}