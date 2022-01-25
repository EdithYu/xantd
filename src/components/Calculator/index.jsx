import React, { Component } from 'react'
import { Modal, Row, Col, Button, Divider } from 'antd'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import './index.scss'

const selection = window.getSelection()
class Calculator extends Component {
  static propTypes = {
    itemName: PropTypes.string.isRequired, // 计算考评等级名称，如优秀
    defaultValue: PropTypes.string, // 编辑传入的text
    validateResult: PropTypes.object, // 公式验证结果
    calculatorObject: PropTypes.array.isRequired, // 计算对象数组
    visible: PropTypes.bool.isRequired, // 是否显示弹窗
    title: PropTypes.string.isRequired, // 对话框头部名称
    handleOK: PropTypes.func.isRequired, // 提交回调
    handleCancle: PropTypes.func.isRequired, // 取消回调
    handleValidate: PropTypes.func.isRequired, // 公式验证
    destroyOnClose: PropTypes.bool // 关闭时销毁 Modal 里的子元素
  }

  static defaultProps = {
    validateResult: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      type: '',
      explainVisible: 'none'
    }
  }

  calculatorSymbol = ['+', '-', '*', '/', '()', '>', '<', '=', '≥', '≤', '≠']

  calculatorNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

  calculatorFun = [{
    base: '常用函数',
    types: ['IF', 'AND', 'OR', 'MIN', 'MAX']
  }]

  componentDidMount () {
    if (this.calculatorElem) {
      this.handleData(this.props)
    }
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.calculatorObject !== this.props.calculatorObject) || (nextProps.defaultValue !== this.props.defaultValue)) {
      if (this.calculatorElem) {
        this.handleData(nextProps)
      }
    }
  }

  generateStr = (str) => {
    this.keepFocus()
    switch (str) {
      case 'IF':
        return 'IF( , , )'
      case 'AND':
        return 'AND()'
      case 'OR':
        return 'OR()'
      case 'MIN':
        return 'MIN()'
      case 'MAX':
        return 'MAX()'
      case '':
        return "''"
      default:
        return str
    }
  }

  handleData = (nextProps) => { // 将传入的初始数据转为界面显示
    this.calculatorElem.innerText = ''
    const calculatorObject = nextProps.calculatorObject
    const defaultValue = nextProps.defaultValue
    if (defaultValue) {
      this.keepFocus()
      const strArr = defaultValue.split('#')
      for (const item of strArr) {
        if (calculatorObject.includes(item)) {
          this.calculatorElem.insertAdjacentHTML('beforeEnd', `<span class='obj-text' contenteditable='false'>#${item}#</span>`)
        } else {
          this.calculatorElem.insertAdjacentText('beforeEnd', item)
        }
      }
    }
  }

  handleFunEnter = (type) => {
    if (!type || type === '') {
      return
    }
    this.setState({
      type: type
    })
    this.timeout = setTimeout(() => {
      this.setState({
        explainVisible: 'block'
      })
    }, 500)
  }

  handleFunLeave =(type) => {
    clearTimeout(this.timeout)
    this.setState({
      type: '',
      explainVisible: 'none'
    })
  }

  handleSymbolClick = (val) => { // 符号点击事件
    document.execCommand('insertText', false, this.generateStr(val))
    if (val === '()' || val === '') {
      this.movePointer('left', 1)
    }
  }

  handleFunClick = (type) => { // 函数点击事件
    clearTimeout(this.timeout)
    this.setState({
      type: '',
      explainVisible: 'none'
    })
    document.execCommand('insertText', false, this.generateStr(type))
    if (type === 'IF') {
      this.movePointer('left', 5)
    } else {
      this.movePointer('left', 1)
    }
  }

  handleObjClick = (val) => { // 对象点击事件
    document.execCommand('insertHTML', false, `<span>&nbsp</span><span class='obj-text' contenteditable='false'>#${val}#</span><span>&nbsp</span>`)
    this.movePointer('right', 1)
    this.movePointer('left', 1)
    this.keepFocus()
  }

  keepFocus = () => {
    const div = this.calculatorElem
    div && div.focus()
  }

  movePointer = (direction, count) => {
    for (let i = 0; i < count; i++) {
      selection.modify('move', direction, 'character')
    }
  }

  generateFunTemplate = () => {
    return this.calculatorFun.map((item, index) => {
      return (
        <ul key={index}>
          <span className='base'>{item.base}</span>
          {
            item.types.map((type, index) => {
              return (
                <li
                  key={index}
                  onClick={() => { this.handleFunClick(type) }}
                  onMouseEnter={() => { this.handleFunEnter(type) }}
                  onMouseLeave={() => { this.handleFunLeave(type) }}
                >{type}
                  <span className='insert'>{intl.get('button.insert')}</span>
                </li>
              )
            })
          }
        </ul>
      )
    })
  }

  generateExplainTemplate = (val) => {
    switch (val) {
      case 'IF':
        return (
          <div className='calendar-wrap-box'>
            <div className='desc_title'>
              <span className='icon' />IF
            </div>
            <div>
              <p>{intl.get('calculator.if_a')}</p>
              <h3>{intl.get('calculator.grammer')}</h3>
              <p>{intl.get('calculator.if_c')}</p>
              <ul>
                <li>{intl.get('calculator.if_d')}</li>
                <li>{intl.get('calculator.if_e')}</li>
                <li>{intl.get('calculator.if_f')}</li>
              </ul>
            </div>
          </div>
        )
      case 'AND':
        return (
          <div className='calendar-wrap-box'>
            <div className='desc_title'>
              <span className='icon' />AND
            </div>
            <div>
              <p>{intl.get('calculator.and_a')}</p>
              <h3>{intl.get('calculator.grammer')}</h3>
              <p>{intl.get('calculator.and_b')}</p>
              <ul>
                <li>{intl.get('calculator.and_c')}</li>
                <li>{intl.get('calculator.and_d')}</li>
              </ul>
            </div>
          </div>
        )
      case 'OR':
        return (
          <div className='calendar-wrap-box'>
            <div className='desc_title'>
              <span className='icon' />OR
            </div>
            <div>
              <p>{intl.get('calculator.or_a')}</p>
              <h3>{intl.get('calculator.grammer')}</h3>
              <p>{intl.get('calculator.or_b')}</p>
              <ul>
                <li>{intl.get('calculator.or_c')}</li>
                <li>{intl.get('calculator.or_d')}</li>
              </ul>
            </div>
          </div>
        )
      case 'MIN':
        return (
          <div className='calendar-wrap-box'>
            <div className='desc_title'>
              <span className='icon' />MIN
            </div>
            <div>
              <p>{intl.get('calculator.min_a')}</p>
              <h3>{intl.get('calculator.grammer')}</h3>
              <p>{intl.get('calculator.min_b')}</p>
            </div>
          </div>
        )
      case 'MAX':
        return (
          <div className='calendar-wrap-box'>
            <div className='desc_title'>
              <span className='icon' />MAX
            </div>
            <div>
              <p>{intl.get('calculator.max_a')}</p>
              <h3>{intl.get('calculator.grammer')}</h3>
              <p>{intl.get('calculator.max_b')}</p>
            </div>
          </div>
        )
      default:
        break
    }
  }

  generateValidateTemplate = () => {
    // 获取校验结果
    const { validateResult } = this.props
    if (validateResult.code === '0') {
      return (
        <span className='validate'>
          <img src={require('./check-circle.svg')} className='icon' />
          <span className='text-success'>{intl.get('calculator.validate_success')}</span>
        </span>
      )
    } else if (validateResult.code === '1') {
      return (
        <span className='validate'>
          <img src={require('./error.svg')} className='icon' />
          <span className='text-failed'>{validateResult.message}</span>
        </span>
      )
    }
  }

  onHandleAfterCloseEvent = () => {
    const { destroyOnClose } = this.props
    if (destroyOnClose) {
      this.calculatorElem.innerText = ''
    }
  }

  render () {
    const { type, explainVisible } = this.state
    const { handleCancle, handleOK, itemName, calculatorObject, visible, title, handleValidate } = this.props
    this.keepFocus()
    return (
      <Modal
        forceRender
        title={title}
        visible={visible}
        className='calculator-container'
        afterClose={this.onHandleAfterCloseEvent}
        bodyStyle={{
          height: '577px'
          
        }}
        centered
        onOk={() => { handleOK(this.calculatorElem.innerText) }}
        onCancel={handleCancle}
      >
        <div className='left-content'>
          <div className='title'>{itemName} = </div>
          <div
            className='input-wrap'
            id='calculator'
            contentEditable='true'
            suppressContentEditableWarning='true'
            onKeyDown={this.handlePressEvent}
            ref={(calculator) => { this.calculatorElem = calculator }}
          />
          <Row style={{ margin: '16px 0px ' }} align='middle'>
            <Button style={{ marginRight: '8px' }} onClick={() => { handleValidate(this.calculatorElem.innerText) }}>{intl.get('calculator.validate')}</Button>
            {
              this.generateValidateTemplate()
            }
          </Row>
          <Row className='title'>{intl.get('calculator.symbol')}</Row>
          <Row justify='space-between' align='baseline' className='wrapspace'>
            <Col span={24}>
              <Row justify='space-between' align='middle'>
                {
                  this.calculatorSymbol.map((item, index) => {
                    return (
                      <Button key={index} onClick={() => { this.handleSymbolClick(item) }} style={{ width: '50px', margin: '4px 0px' }}>{item}</Button>
                    )
                  })
                }
                <Button onClick={() => { this.handleSymbolClick('') }} style={{ width: '50px', margin: '4px 0px' }} title={intl.get('calculator.tips')}>' '</Button>
              </Row>
            </Col>
          </Row>
          <Row style={{ margin: '4px 0px' }} className='title'>{intl.get('label.calculation_object')}</Row>
          <Row className='object'>
            {
              calculatorObject.map((item, index) => {
                return (
                  <Button key={index} onClick={() => { this.handleObjClick(item) }} className='object-btn' title={item}>{item}</Button>
                )
              })
            }
          </Row>
        </div>
        <Divider type='vertical' style={{ height: '100%' }} />
        <div className='right-content'>
          <div>{intl.get('calculator.insert_fun')}</div>
          <div className='fun-wrap'>
            {this.generateFunTemplate()}
          </div>
          <div className='explain-wrap' style={{ display: explainVisible }}>
            {
              this.generateExplainTemplate(type)
            }
          </div>
        </div>
      </Modal>
    )
  }
}

export default Calculator
