# 计算器

用于解决一些复杂的规则计算场景

## API

| 参数             | 说明                 | 类型                  | 默认值 | 版本 |
| ---------------- | -------------------- | --------------------- | :----- | ---- |
| itemName         | 计算规则名称         | string                | -      |      |
| defaultValue     | 用于编辑的默认值     | string                | -      |      |
| title            | 弹窗名称             | string                | -      |      |
| visible          | 显示控制             | boolean               | -      |      |
| destroyOnClose   | 弹窗关闭是否注销内容 | boolean               | -      |      |
| validateResult   | 验证结果             | object                | -      |      |
| calculatorObject | 计算对象             | array                 | -      |      |
| handleOK         | 点击确认回调函数     | function(text) : void | -      |      |
| handleCancle     | 点击取消回调函数     | function              | -      |      |
| handleValidate   | 点击公式校验回调函数 | function(text): void  | -      |      |

