import React from 'react'
import PropTypes from 'prop-types'
import './index.less'
import 'video-react/dist/video-react.css'
import { Player } from 'video-react'

Video.defaultProps = {
  height: 300
}

Video.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

function Video (props) {
  return (
    <div className='video-content'>
      <Player
        {...props}
      />
    </div>
  )
}

export default Video
