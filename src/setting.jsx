import { Button, Form, Input, Space } from 'antd';
import FormItem from './component/Form';
import Mazhab from './component/FormMazhb';
import { Country, City } from 'country-state-city';
import { useState } from 'react';
const layout = {
  labelCol: { 
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const MAZHAB = [
    {name: 'Shafi'},{name: 'Hanafi'},{name: 'Maliki'}, {name: "Hanbali"}
];

const SALAT_METHOD = [{name: 'University of Scinece, Karachi'}]
const Setting = () => {
  const [form] = Form.useForm();
  const [ country, setCountry ] = useState();
  const [ countryCode, SetCountryCode ] = useState();
  let getAllCountry = Country.getAllCountries();

  const onChangeCountry = (value) => {
    console.log(value);
        setCountry(value);
        SetCountryCode(() => {
			const selectedCountryCode = getAllCountry.find(
				(e) => e.name === value
			);
			return selectedCountryCode.isoCode; 
		});
  };

  const salatTime  = new Date();
  const currentMonth = salatTime.getMonth() + 1;
  const currentDay  = salatTime.getDate();

  const onFinish = (values) => {
    localStorage.setItem('users',JSON.stringify(values));
    const getUserData = JSON.parse(localStorage.getItem('users'));
    if (getUserData) {
        const {country, Mazhab, city,salat_method} = getUserData;
        fetch(`https://api.aladhan.com/v1/calendarByCity/2023/${currentMonth}?city=${city}&country=${country}&method=${salat_method}school=${Mazhab}`)
        .then((response) => response.json())
        .then((data) => {
           localStorage.setItem('prayerTime', JSON.stringify(data));
        })
        .catch((err) => {
           console.log(err.message);
        });
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className='setting'>
        <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
            maxWidth: 600,
        }}
        >
        <Form.Item
            name="name"
            label="Name"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input placeholder='Your Name'/>
        </Form.Item>
        <FormItem name="country" label="Country" onChange={onChangeCountry} placeholder="Select Your Country" options={getAllCountry}/>
        <FormItem name="city" label="City" placeholder="Select Your City" options={City.getCitiesOfCountry(countryCode)}/>
        <Mazhab name="mazhab" label="Mazhab" placeholder="Select Your Mazhab" options={MAZHAB}/>
        <Mazhab name="salat_method" label="Salat Time Calculation Methods" placeholder="Select Your City Salat Time Calculation Methods" options={SALAT_METHOD}/>
        <Form.Item {...tailLayout}>
            <Space>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Space>
        </Form.Item>
        </Form>
    </div>    
    );
};
export default Setting;