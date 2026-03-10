export default function RecommendationCard({name,skill}){

return(

<div className="border rounded-xl p-4 shadow">

<h3 className="text-lg font-bold">{name}</h3>

<p className="text-gray-500">
Expertise: {skill}
</p>

</div>

)

}