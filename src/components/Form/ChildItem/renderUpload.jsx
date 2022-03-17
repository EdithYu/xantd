import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, Modal } from 'antd'
import '../index.less'
const renderUpload = (props) => {
  // const [previewVisible, setPreviewVisible] = useState(false)
  // const [previewImage, setPreviewImage] = useState('')
  // const [previewTitle, setPreviewTitle] = useState('')

  // function getBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }

  const beforeUpload = info => { // 上传附件
    // 限制附件 格式、size、分辨率 .jpg .png .pdf .doc .docx .xls .xlsx .zip .rar
    const { size, accept } = props
    const fileType = accept ? accept.split(',') : ''
    let fileName = info.name
    // 截取文件名
    const pointPos = fileName.lastIndexOf('.')
    fileName = fileName.substr(pointPos)
    if (fileType && !fileType.includes(fileName)) {
      message.warning('该文件格式不支持')
      return Upload.LIST_IGNORE
    } else if (size) {
      const isLt2M = info.size / 1024 / 1024 < size
      if (!isLt2M) {
        message.warning(`文件大小不可超过${size}M`)
        return Upload.LIST_IGNORE

      }
      return isLt2M || Upload.LIST_IGNORE
    }
  }

  // const handleCancel = () => setPreviewVisible(false);

  // const handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview)
  //   setPreviewVisible(true)
  //   setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  // };

  // const uploadButton = (
  //   <div>
  //     <PlusOutlined />
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // )

  return (
    <Upload
      className='render-upload'
      name="files"
      action='/api/gpsservice/v1/attachment/multiUpload' 
      listType="picture" 
      beforeUpload={beforeUpload}
      {...props} 
    >
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  )
}

export default renderUpload