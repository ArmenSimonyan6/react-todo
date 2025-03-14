import React, { useState } from 'react'
import checkedIcon from '../assets/icons/check.png'
import notCheckedIcon from '../assets/icons/dry-clean.png'

const PostChecked = ({ done }) => {
    return (
        <img
            src={done ? checkedIcon : notCheckedIcon} 
            style={{ width: "30px" }}
        />
    );
};

export default PostChecked;