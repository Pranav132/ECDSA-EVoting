import { Card } from "./Card"
import { useAuth } from "../../Globals/authContext";

export const ProfileCards = () => {

  const userData = useAuth().userData;

    const data = [
      {
        title:"Name",
        value: userData.name
      },
      {
        title:"Username",
        value:userData.username
      },
      {
        title:"Voting Status",
        value:userData.has_voted === 'false' ? 'Not Voted' : 'Voted'
      }
    ];

    return(
        <section className="bg-gray-200 py-10 flex justify-center align-center px-12 " >
            <div
                className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((detail, key) => {return( <Card title={detail.title} value={detail.value} key={key}/>)})}
            </div>
        </section>
    )
}

