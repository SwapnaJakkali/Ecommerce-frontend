import React from "react";
import diningImage from "../assets/dining.png";
import livingImage from "../assets/living.png";
import bedroomImage from "../assets/bedroom.png";
import "./Range.css"

function Range(){
    return(
        <section className="range">
            <div className="range-header">
                 <h2>Browse The Range</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
            </div>
            <div className="range-cards">
                <div className="range-card">
                    <img src={diningImage} alt="Dining" />
          <h3>Dining</h3>
                </div>
                <div className="range-card">
                    <img src={livingImage} alt="Living" />
          <h3>Living</h3>
                </div>
                <div className="range-card">
                    <img src={bedroomImage} alt="Bedroom" />
          <h3>Bedroom</h3>
                </div>
            </div>
        </section>
    )
}
export default Range