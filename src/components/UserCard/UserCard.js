import React from 'react';


function UserCard (props) {
    
                 return (
                  <div className="row">

                        {/* USER CARD */}

                              <div className="mt-2">
                              <h4 className=''> name: {props.gender} </h4>
          
                              </div>
                  </div>
            )
      }


export default UserCard;