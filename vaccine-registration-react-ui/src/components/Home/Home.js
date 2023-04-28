import { Link } from "react-router-dom"
import medicine from "../../assets/undraw_medicine_deep_blue.svg"
import "./Home.css"

export default function Home() {
  return (
    <div className="Home">
      <div className="jumbo">
        <h3 className="subheading">COVID-19 VACCINE HUB</h3>

        <h1 className="heading">Vaccine Scheduler</h1>
      </div>

      <div className="actions">
        <div className="links">
          <Link to="/register">
            <button className="btn primary">Schedule First Appointment</button>
          </Link>
          <Link to="/portal">
            <button className="btn outline">Confirm Appointment</button>
          </Link>
        </div>
      </div>

      <div className="media">
        <img src={medicine} alt="medicine" />
      </div>
    </div>
  )
}
