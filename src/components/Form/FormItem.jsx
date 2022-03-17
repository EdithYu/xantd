import React from 'react'
import { Form, Input, Select, Radio, TreeSelect, Cascader, DatePicker, InputNumber, Switch } from 'antd'
import renderUpload from './ChildItem/renderUpload'
const { TextArea } = Input

const FormItem = ({
  type,
  label,
  name,
  required,
  rules,
  formItemProps,
  ...props
}) => {
  const getLabelAndValue = (labelKey, valueKey, item) => { // 默认为value为id字段， label为name字段
    const label = labelKey ? item[labelKey] : item.name
    const value = valueKey ? item[valueKey] : item.id
    return {
      label,
      value
    }
  }

  const getValuePropName = (type) => {
    switch (type) {
      case 'switch':
        return 'checked'
      case 'upload':
        return 'fileList'
      default:
        return undefined
    }
  }

  const getValueFromEvent = (type) => {
    switch (type) {
      case 'upload':
        return normFile
      default:
        return undefined
    }
  }

  const getLabel = (type, label) => {
    switch (type) {
      case 'upload':
        const { maxCount, size } = props
        return (
          <div>
            <span>{label}</span>
            <span>(最多可上传{maxCount || 3}个附件，单个附件大小不超过{size || 5}M)</span>
          </div>
        )
      default:
        return label
    }
  }

  const normFile = (e) => { // 针对upload组件做的处理
    if (Array.isArray(e)) {
      return e;
    }
    if (e?.fileList) {
      return e.fileList.map((item) => {
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
    }
    return e && e.fileList;
  };

  const renderInput = () => {
    return <Input placeholder={`请输入${label}`} {...props} />
  }

  const renderTextArea = () => {
    return <TextArea placeholder={`请输入${label}`} {...props} />
  }

  const renderSelect = () => {
    const { optionData, labelKey, valueKey, ...otherProps } = props
    return (
      <Select
        placeholder={`请选择${label}`}
        showSearch
        filterOption={(input, option) => {
          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }}
        {...otherProps}
      >
        {(optionData || []).map((item, index) => {
          const { label, value } = getLabelAndValue(labelKey, valueKey, item)
          return (
            <Select.Option key={`${index}${value}`} value={value}>
              {label}
            </Select.Option>
          )
        })}
      </Select>
    )
  }

  const renderRadio = () => {
    const { optionData, labelKey, valueKey, ...otherProps } = props
    return (
      <Radio.Group
        placeholder={`请选择${label}`}
        {...otherProps}
      >
        {(optionData || []).map((item, index) => {
          const { label, value } = getLabelAndValue(labelKey, valueKey, item)
          return (
            <Radio key={`${index}${value}`} value={value}>
              {label}
            </Radio>
          )
        })}
      </Radio.Group>
    )
  }

  const renderTreeSelect = () => {
    return <TreeSelect {...props} />
  }

  const renderCascader = () => {
    return <Cascader {...props} />
  }

  const renderDateRangePicker = () => {
    const { RangePicker } = DatePicker
    return <RangePicker {...props} />
  }

  const renderDatePicker = () => {
    return <DatePicker {...props} />
  }

  const renderInputNumber = () => {
    return <InputNumber {...props} />
  }

  const renderSwitch = () => {
    return <Switch {...props} />
  }

  const renderItem = () => {
    switch (type) {
      case 'input':
        return renderInput()
      case 'textarea':
        return renderTextArea()
      case 'select':
        return renderSelect()
      case 'radio':
        return renderRadio()
      case 'daterangepicker':
        return renderDateRangePicker()
      case 'treeselect':
        return renderTreeSelect()
      case 'datepicker':
        return renderDatePicker()
      case 'cascader':
        return renderCascader()
      case 'inputnumber':
        return renderInputNumber()
      case 'switch':
        return renderSwitch()
      case 'upload':
        return renderUpload({
          maxCount: 3,
          size: 5,
          ...props
        })
    }
  }

  return (
    <Form.Item
      label={getLabel(type, label)}
      name={name}
      rules={rules || [{ required: required, message: `${label}为必填项` }]}
      valuePropName={getValuePropName(type)}
      getValueFromEvent={getValueFromEvent(type)}
      {...formItemProps}
    >
      {renderItem()}
    </Form.Item>
  )
}

export default FormItem
