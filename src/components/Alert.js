import React from 'react'

const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-primary text-center" role="alert">
        Keep Notes Save!
{props.message}
</div>
    </div>
  )
}

export default Alert
