import React from 'react';
import PropTypes from 'prop-types';
// import './LinkLink.css';
// import './Menuli.css'
const Tablerow = ({dataObj}) => {
//   console.log("dataObj:", dataObj);
//   console.log('Object.keys(dataObj):', Object.keys(dataObj));
  return (
    <tr>
        {
            Object.keys(dataObj).map(
                (ele, index) => {
                    if(dataObj[ele] !== -1){
                        return <td key={index}>{dataObj[ele] + ''}</td>
                    }
                }
            )
        }
    </tr>
  );
};

Tablerow.propTypes = {
    dataObj: PropTypes.object.isRequired
};

export default Tablerow;