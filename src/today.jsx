
import DataList from './component/DataList/DataList.jsx';
import './App.css'
import { useState } from 'react';
import moment from 'moment'

export default function Today () {    

    return (
        <div className="today">
            <DataList />
        </div>
    )
}
