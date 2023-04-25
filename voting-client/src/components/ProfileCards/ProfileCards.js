import { Card } from "./Card"

export const ProfileCards = () => {

    const data = [
      {
        title:"Name",
        value:"Pranav Iyengar"
      },
      {
        title:"Voted",
        value:"False"
      },
      {
        title:"Details",
        value:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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

