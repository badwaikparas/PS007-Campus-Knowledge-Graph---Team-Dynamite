import { BrowserRouter,Routes,Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Dashboard from "./pages/Dashboard"
import Search from "./pages/Search"
import Collaborators from "./pages/Collaborators"
import Trends from "./pages/Trends"

function App(){

return(

<BrowserRouter>

<div className="flex">

<Sidebar/>

<div className="flex-1">

<Routes>

<Route path="/" element={<Dashboard/>}/>
<Route path="/search" element={<Search/>}/>
<Route path="/collaborators" element={<Collaborators/>}/>
<Route path="/trends" element={<Trends/>}/>

</Routes>

</div>

</div>

</BrowserRouter>

)

}

export default App