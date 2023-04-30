import { Card } from "./Card"

export const CandidateCards = () => {

    // NOT LOADING CANDIDATES FROM DATABASE TO REDUCE LOADING TIME. 
    // DEFINING CANDIDATES HERE
    // ALSO DEFINING IN DATABASE TO TRACK VOTES
    // DATABASE WILL ONLY HAVE NAME OF CANDIDATE

    const data = [
        {
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
            title: "Javascript",
            description:
                "A dynamic, interpreted programming language that is commonly used in web development. Its strengths include flexibility, easy integration with other languages, and a large and active community. It is often used to create interactive user interfaces, as well as server-side applications and web services.",
        },
        {
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Python.svg/2048px-Python.svg.png",
            title: "Python",
            description:
                "A high-level, interpreted programming language that emphasizes readability and ease of use. Its strengths include a simple and intuitive syntax, a large and comprehensive standard library, and broad support for scientific computing and data analysis. It is often used for scripting, automation, web development, machine learning, and scientific research.",
        },
        {
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png",
            title: "C",
            description:
                "A low-level, compiled programming language that is widely used for system programming and operating systems. Its strengths include speed, efficiency, and direct access to hardware resources. It is often used for developing operating systems, device drivers, embedded systems, and other performance-critical applications.",
        },
        {
            image:
                "https://i.pinimg.com/originals/f1/ea/a7/f1eaa7278f64e27128e062a3de918265.png",
            title: "Java",
            description:
                "A class-based, object-oriented programming language that is designed to be platform-independent and portable. Its strengths include robustness, security, and scalability, as well as a large and mature ecosystem of libraries, frameworks, and tools. It is often used for developing enterprise applications, web services, mobile apps, and games.",
        },
    ];

    return(
        <section className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
            <div
                className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((candidate, key) => {return( <Card title={candidate.title} img={candidate.image} description={candidate.description} key={key}/>)})}
            </div>
        </section>
    )
}

