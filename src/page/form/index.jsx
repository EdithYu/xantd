/*
  form表单输入类型
  1. input 输入框
*/
import React from 'react'
import { Form } from 'antd';
import 'antd/dist/antd.css'
import { useEffect } from 'react'
import FormItem from '@/components/Form/FormItem'
import moment from 'moment'

const Demo = () => {
  const [form] = Form.useForm()
  const fields = [
    {
      type: 'input',
      label: 'input',
      name: 'name',
      required: true,
    },
    {
      type: 'inputnumber',
      label: 'inputnumber',
      name: 'inputnumber',
      required: true,
    },
    {
      type: 'select',
      label: 'select',
      name: 'select',
      required: true,
      optionData: [
        {
          id: 1,
          name: '篮球'
        },
        {
          id: 2,
          name: '足球'
        }
      ]
    },
    {
      type: 'radio',
      label: 'radio',
      name: 'radio',
      required: true,
      optionData: [
        {
          id: 1,
          name: '男'
        },
        {
          id: 2,
          name: '女'
        }
      ]
    },
    {
      type: 'daterangepicker',
      label: 'daterangepicker',
      name: 'daterangepicker',
      required: true
    },
    {
      type: 'datepicker',
      label: 'datepicker',
      name: 'datepicker',
      required: true
    },
    {
      type: 'textarea',
      label: 'textarea',
      name: 'textarea',
      required: true
    },
    {
      type: 'treeselect',
      label: 'treeselect',
      name: 'treeselect',
      required: true,
      treeData: [
        { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }
      ]
    },
    {
      type: 'switch',
      label: 'switch',
      name: 'switch',
      required: true,
    },
    {
      type: 'cascader',
      label: 'cascader',
      name: 'cascader',
      required: true,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
            },
          ],
        },
      ]
    },
    {
      type: 'upload',
      label: 'upload',
      name: 'upload',
      required: true,
      // accept: '.png',
      maxCount: 2,
      size: 1
    }
  ] 
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  useEffect(() => {
    form.setFieldsValue({
      input: 'yzq',
      inputnumber: 15,
      select: 2,
      radio: 1,
      daterangepicker: [moment(), moment()],
      datepicker: moment(),
      textarea: '热爱生活，拥抱阳光',
      treeselect: 'bamboo',
      switch: true,
      cascader: ['zhejiang', 'hangzhou'],
      upload: [
        {
          uid: '11212121',
          name: '抓拍',
          url: '/upload_files/attachment/20220316/f3862e4d070748d5a590974e5e95f86b.webp'
        }
      ]
    })
  }, [])

  const handleValuesChange = (value, allValus) => {
    console.log(value)
  }


  return (
    <div style={{
      width: '500px',
      padding: '20px 20px',
      border: '1px solid #d9d9d9',
      boxSizing: 'border-box',
      margin: '0 auto',
      backgroundColor: '#f0f0f0'
     }}>
      <Form
        form={form}
        layout='vertical'
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        {
          fields.map((item) => {
            return <FormItem {...item} key={item.name}/>
          })
        }
      </Form>
    </div>
  );
};

export default Demo