export default function ImproveSkills(){
    const list = [
        "Enhance your cooking skills",
        "Discover new recipes",
        "Experiment with flavors",
        "Create your own recipes",
        "Learn nutrition facts",
        "Receive expert cooking tips",
        "Enjoy cooking",

    ]

    return (
        <div className="section improve-skills">
            <div className="col img">
                <img src="/img/gallery/img_10.jpg" alt="" />
            </div>
            <div className="col typography">
                <h1 className="title">Boost your cooking skills with every dish!</h1>
                { list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                )) }
                <button className="btn">signup now</button>
            </div>
        </div>
    )
}