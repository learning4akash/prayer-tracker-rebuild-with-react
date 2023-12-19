import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

const FormItm = ({ placeholder, name, label, onChange, options }) => {

  return (
    <Form.Item
            name={name}
            label={label}
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Select
            placeholder={placeholder}
            onChange={onChange}
            allowClear
            >
            {options.map((value, index) => (
              <Option key={index} value={value.name}>{value.name}</Option>
            ))}
            </Select>
    </Form.Item>
  )

}
export default FormItm