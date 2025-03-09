import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function QouteSection(){
    return (
        <div className="section quote">
            <p className="qoute-text"><FontAwesomeIcon icon={faQuoteLeft} /> Unlock the joy of cooking with mouthwatering recipes that ignite your taste buds! Whether you're craving comfort food or daring to try something new, there's always a delicious adventure waiting. Join us and explore endless flavors, tips, and culinary inspiration!</p>
            <p className="qoute-auther">- Akshaya</p>
        </div>
    )
}