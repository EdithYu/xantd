import React, { useEffect } from 'react'
import Player from '@/components/Player'

function TestPlayer () {
  useEffect(() => {
    debugger
  }, [])
  const data = [
    {
      imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1135967539,624108140&fm=26&gp=0.jpg',
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
      resourceUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 2
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: 'http://47.110.125.71:8016/upload_files/alarm/20210224/b1081e00ce704a1ab532857e5126abf4/7946395_02_01_0000_210224044720_210224044732.mp4',
      type: 1
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: '',
      type: 2
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: '',
      type: 1
    },
    {
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      resourceUrl: '',
      type: 2
    }
  ]
  return (
    <div
      style={{
        width: '500px',
        position: 'relative',
        background: '#141414'
      }}
    >
      <Player
        data={data}
      />
    </div>
  )
}
export default TestPlayer
