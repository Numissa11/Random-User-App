import React from 'react';
import './UserCard.css'

function UserCard(props) {

      return (
            <div className="row">

                  {/* USER CARD */}
                  <div className="container m-4">


                        <div className="bg-dark rounded p-5 text-white text-center card shadow-lg">
                              <h3 className="mon-titre text-uppercase font-weight-bold card-title mb-4">{props.name.first} {props.name.last}</h3>
                              <img className='mon-image mb-4 border border-white' src={props.picture.large} alt={props.name.first} />
                              <div className='mes-divs'>
                                    <p className='bg-light text-dark rounded'> Gender : {props.gender} </p>
                                    <p className='bg-light text-dark rounded'>Postcode : {props.location.postcode}</p>
                                    <p>Locality : {props.location.country}</p>
                                    <p>City : {props.location.city}</p>
                                    <p>Phone : {props.cell}</p>

                              </div>

                        </div>

                  </div>
            </div>
      )
}


export default UserCard;