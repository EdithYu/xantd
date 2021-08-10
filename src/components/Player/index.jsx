import React, { useState, useEffect } from 'react'
import './index.less'
import PropTypes from 'prop-types'
import ImageList from '../ImageList'
import Video from '../Video'
import { Image } from 'antd'
import HideVideoIcon from '@/assets/imgs/hidevideo.png'

Player.propTypes = {
  data: PropTypes.array,
  number: PropTypes.number,
  hideClickEvent: PropTypes.func
}

Player.defaultProps = {
  hideClickEvent: () => {}
}

function Player (props) {
  const [currentUrl, setCurrentUrl] = useState('')
  const [currentType, setcurrentType] = useState(1)
  const { data, number, hideClickEvent } = props

  const handleClickEvent = (data) => {
    setcurrentType(data.type)
    setCurrentUrl(data.resourceUrl)
  }

  useEffect(() => {
    handleClickEvent(data[0])
  }, []);

  return (
    <div className='player-content'>
      <div className='player-video-content'>
        {
          currentType === 1
            ? <Video
                src={currentUrl}
                height={280}
                fluid={false}
              />
            : <Image src={currentUrl} alt='加载中' className='image' height={280} />
        }
        <img src={HideVideoIcon} className='hide-video'/>
      </div>
      <ImageList
        className='image-list'
        data={data}
        number={number}
        handleClickEvent={handleClickEvent}
        hideClickEvent={hideClickEvent}
      />
    </div>
  )
}

export default Player
