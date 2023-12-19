import React from 'react';
import {  Flex, Checkbox } from 'antd';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import './dataShow.css';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment'


const justifyOptions = [
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ];
  
  const alignOptions = ['flex-start', 'center', 'flex-end'];
  const GLOBAL_DATE_FORMAT = 'YYYY-MM-DD';      
  const DataList = () => {
    const [justify, setJustify] = React.useState(justifyOptions[3]);
    const [alignItems, setAlignItems] = React.useState(alignOptions[1]);
    const [date, setDate] = useState(moment().format(GLOBAL_DATE_FORMAT));
    const [timings, setTimings] = useState([]);
    const [prayerDateLabel, setPrayerDateLabel] = useState(new Date().toLocaleDateString("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }))
    const [data, setData] = useState([]);  
    const [storeCurrentDatePersistentIndex, setStoreCurrentDatePersistentIndex] = useState(-1);
    const buildPrayerTimings = (prayerTimingData, buildData) => {
        const currentDate = moment(date).format('DD');
        const currentPrayerTime = prayerTimingData[currentDate - 1];

        const _timings = []
        const cutTimingKey =  ['Sunrise', 'Sunset', 'Imsak', 'Midnight', 'Lastthird', 'Firstthird'];
        for (var key in currentPrayerTime.timings) {
            const id = _timings.length + 1;
            if (cutTimingKey.indexOf(key) == -1) {
                _timings.push({
                    id: id,
                    label: key,
                    time: currentPrayerTime.timings[key],
                    isCompleted: buildData?.timings?.find(timing => key === timing.label)?.isCompleted ?? false
                })
            }
        }
        setTimings(_timings);
        setPrayerDateLabel(currentPrayerTime.date.readable);
    }
     console.log(timings);
    useEffect(() => {
        if (!data.length) {

            const {data:getPrayerTimingData} = JSON.parse(localStorage.getItem('prayerTime'));
            const buildPersistentData = JSON.parse(localStorage.getItem('build_persistent_data') ) ?? [];
            const getMatchDateIndex   = buildPersistentData?.findIndex(data => date == data?.date);
            let buildPresistentResult = {}

            if (getMatchDateIndex > -1) {
                setStoreCurrentDatePersistentIndex(getMatchDateIndex);
                buildPresistentResult = buildPersistentData[getMatchDateIndex];
            }
            setData(getPrayerTimingData);
            buildPrayerTimings(getPrayerTimingData, buildPresistentResult);
        }
    },[]);
    console
    useEffect(() => {
        if (data.length) {
         const buildPersistentData = JSON.parse(localStorage.getItem('build_persistent_data') ) ?? [];
         const getMatchDateIndex   = buildPersistentData?.findIndex(data => date == data?.date); 
         let buildPresistentResult = {}
         if (getMatchDateIndex > -1) {
                setStoreCurrentDatePersistentIndex(getMatchDateIndex);
                buildPresistentResult = buildPersistentData[getMatchDateIndex];
            } else {
                setStoreCurrentDatePersistentIndex(-1)
            }
            buildPrayerTimings(data, buildPresistentResult);
        }
    },[date]);

    const handleCompleteSalat = (index) => {
        const timing = {...timings[index]};
        timing.isCompleted = !timing.isCompleted;
        timings[index] = timing;
        const buildPersistentData = JSON.parse(localStorage.getItem("build_persistent_data")) ?? [];
        if (storeCurrentDatePersistentIndex > -1) {
            const data = buildPersistentData[storeCurrentDatePersistentIndex];
            const prayerIndex = data?.timings?.findIndex(timing => timing.label == timings[index].label);
            if (prayerIndex > -1) {
                data.timings[prayerIndex].isCompleted = timings[index].isCompleted;
              } else {
                data.timings.push(timings[index]);
              }
            buildPersistentData[storeCurrentDatePersistentIndex] = data;
        } else {
            buildPersistentData.push({
              date: date,
              timings: [
                timings[index]
              ]
            });
            setStoreCurrentDatePersistentIndex(buildPersistentData.length - 1);
          }  
          localStorage.setItem('build_persistent_data', JSON.stringify(buildPersistentData));
          setTimings([...timings]);

    }

    return (
        <Flex gap="middle" align="start" vertical>    
        <Flex className='iconStyle' justify={justify} align={alignItems}>
            <p onClick={() => {
              setDate(moment(date).subtract(1, 'days').format(GLOBAL_DATE_FORMAT))
            }} ><FaAngleLeft style={{ width: "30px", height: "30px", marginLeft: "50px", cursor:"pointer"}}/></p>
            <p style={{ fontWeight: "bold", marginLeft:"120px"}}>{prayerDateLabel}</p>
            <p onClick={() => {
              setDate(moment(date).add(1, 'days').format(GLOBAL_DATE_FORMAT))
            }}><FaAngleRight style={{ width: "30px", height: "30px", marginLeft:"100px", cursor:"pointer"}} /></p>
        </Flex>
      
      {timings?.map((timing, index) => (
        <Flex key={index}  className='boxStyle' justify={justify} align={alignItems}>
                <li>{timing.label}</li>
                <li>{timing.time}</li>
                <li>{timing.isCompleted ? 'Yes' : 'No'}</li>
                <li>{ date > moment().format(GLOBAL_DATE_FORMAT) ? <Checkbox onChange={() => handleCompleteSalat(index)} disabled  checked={timing.isCompleted}></Checkbox> : <Checkbox onChange={() => handleCompleteSalat(index)}  checked={timing.isCompleted}></Checkbox>}</li>    
        </Flex>
      
      )) }  
    
</Flex>  
    )
  }

  export default DataList;