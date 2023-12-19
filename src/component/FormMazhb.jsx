import { Form, Select } from 'antd';
const { Option } = Select;

const FormItem = ({ placeholder, name, label, onChange, options }) => {

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
              <Option key={index} value={index}>{value.name}</Option>
            ))}
            </Select>
    </Form.Item>
  )

}
export default FormItem