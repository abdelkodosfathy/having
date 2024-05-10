import React from 'react'

const Button = ({key, children, onClicked, proprety, isActivated}) => {

  return (
    <button key={key} onClick={onClicked} className={proprety === isActivated? 'active': null}>
      {children}
      <p>{proprety}</p>
    </button>
  )
}

export default Button