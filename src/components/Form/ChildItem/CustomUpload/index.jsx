import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './index.less'

const CustomUpload = ({ 
  value, 
  onChange, 
  maxCount,
  listType = 'picture-card',
  ...props
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

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

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  };

  const handleOnChange = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e?.fileList) {
      const list =  e.fileList.map((item) => {
        if (item.url) { // 编辑时，数据按原来返回
          return item
        } else if (item?.response?.[0]) { // 初次上传成功后返回，进行格式转换
          return {
            name: item.response[0].name,
            url: `/upload_files/${item.response[0].attachmentPath}`
          }
        } else {
          return item
        }
      })
      setFileList(list)
      onChange(list)
    }
  }

  const isCardMode = () => {
    return listType === 'picture-card'
  }

  const uploadButton = (
    fileList.length >= maxCount ? null : (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
  )

  return (
    <>
      <Upload
        className='custom-upload-component'
        name="files"
        action='/api/gpsservice/v1/attachment/multiUpload' 
        listType={listType}
        fileList={value || fileList}
        beforeUpload={beforeUpload}
        onPreview={isCardMode() ? handlePreview : undefined}
        onChange={handleOnChange}
        {...props} 
      >
        {
          isCardMode() ? uploadButton : <Button icon={<UploadOutlined />} disabled={fileList.length >= maxCount}>上传文件</Button>
        }
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default CustomUpload