import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Checkmark from '../assets/checkmark.png'

function popup(props) {
  return (
    <div className='popup'>
      <div className="popup-inner">
        <CancelOutlinedIcon className='close-btn'/>
        <div className="popupDetail centerVertical">
            {props.children}
        </div>
      </div>
    </div>
  )
}

export default popup;
