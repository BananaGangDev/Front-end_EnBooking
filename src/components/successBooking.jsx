import React from 'react';
import Checkmark from '../assets/checkmark.png'
import Popup from './popup'

function SuccessBooking(props) {
  return (props.trigger) ? (
    <Popup>
        <img src={Checkmark} alt="Checkmark" className="imagePopup"/>
        <h3>Successful Booking</h3>
    </Popup>
  ) : null;
}

export default SuccessBooking;
