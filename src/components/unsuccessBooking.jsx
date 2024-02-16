import React from 'react';
import Error from '../assets/error.png'
import Popup from './popup'

function UnsuccessBooking(props) {
  return (props.trigger) ? (
    <Popup>
    <img src={Error} alt="Error" className="imagePopup"/>
    <h3>Please complete the form</h3>
</Popup>
  ) : null;
}

export default UnsuccessBooking;
