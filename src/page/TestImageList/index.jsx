import React from 'react'
import { ImageList } from '@/components'

function TestImageList () {
  const data = [
    {
      imgUrl: 'https://video.shipin520.com/videos/80/20/03/b_WCY7kPq4fII71556802003_10s.mp4',
      resourceUrl: 'https://video.shipin520.com/videos/80/20/03/b_WCY7kPq4fII71556802003_10s.mp4',
      type: 1
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4',
      type: 1
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 2
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 2
    }
  ]
  return (
    <div
      style={{
        width: '500px',
        position: 'relative',
        background: '#141414',
        padding: '16px 18px'
      }}
    >
      <ImageList
        data={data}
      />
    </div>
  )
}
export default TestImageList
