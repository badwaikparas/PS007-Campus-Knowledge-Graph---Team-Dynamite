import { useState } from "react"
import { searchResearch } from "../services/api"

export default function SearchBar(){

const [query,setQuery] = useState("")
const [results,setResults] = useState([])

const handleSearch = async ()=>{

const data = await searchResearch(query)

setResults(data)

}

return(

<div>

<div className="flex gap-3">

<input
className="border p-3 w-96 rounded-lg"
placeholder="Search research topics..."
onChange={(e)=>setQuery(e.target.value)}
/>

<button
className="bg-blue-600 text-white px-5 py-2 rounded-lg"
onClick={handleSearch}
>
Search
</button>

</div>

<div className="mt-5">

{results.map((r,i)=>(
<div key={i} className="border p-4 rounded-lg mt-3">

{r[0]}

</div>
))}

</div>

</div>

)

}