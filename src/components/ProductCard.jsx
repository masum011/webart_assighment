import React from 'react'
import { PiStarThin } from "react-icons/pi";

export default function ProductCard() {
  return (
    <div>
        <div className="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYz09G_Qmw8V5hil625PAxGImBp8EEvYulLQ&usqp=CAU" alt="" />
        </div>
        <div className="card-metadata">
        <div>
        <PiStarThin color='#edba1c'/>
        <PiStarThin color='#edba1c'/>
        <PiStarThin color='#edba1c'/>
        <PiStarThin color='#edba1c'/>
        <PiStarThin color='#edba1c'/>
        </div>
        <p>custom T-shart</p>
        <p>$ 00:9.3</p>
        </div>
    </div>
  )
}
