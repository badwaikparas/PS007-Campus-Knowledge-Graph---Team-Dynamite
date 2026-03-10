export default function Navbar(){

return(

<div className="bg-gray-900 text-white p-4 flex justify-between">

<h1 className="text-xl font-bold">
Knowledge Intelligence Engine
</h1>

<div className="flex gap-6">

<a href="/">Dashboard</a>
<a href="/search">Search</a>
<a href="/collaborators">Collaborators</a>
<a href="/trends">Trends</a>

</div>

</div>

)

}