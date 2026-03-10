import { Link } from "react-router-dom"

export default function Sidebar() {

return (

<div className="h-screen w-64 bg-gray-900 text-white p-5">

<h1 className="text-2xl font-bold mb-10">
EduGraph AI
</h1>

<div className="flex flex-col gap-5">

<Link to="/">Dashboard</Link>

<Link to="/search">Semantic Search</Link>

<Link to="/collaborators">Collaborators</Link>

<Link to="/trends">Innovation Trends</Link>

</div>

</div>

)

}