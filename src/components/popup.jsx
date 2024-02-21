// Popup.jsx
import React from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function Popup(props) {
  return (
    <div className='popup'>
      <div className="popup-inner">
        <CancelOutlinedIcon className='close-btn' onClick={props.onClose} />
        <div className="popupDetail centerVertical">
            {props.children}
        </div>
      </div>
    </div>
  )
}

export default Popup;
