// import { Devices } from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

export const DevicesList = () => {
  // 
   const [devices, setDevices] = useState<string>('');
  
  useEffect(() => {
    const token: string = localStorage.getItem('access_token');
    if (!token) {
      return <Redirect to='/login' />
    } else {
      axios({
        method: 'post',
        url: 'https://core.nekta.cloud/api/device/metering_devices',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {"page":1,"last_page":0,"sort_field":"id","sort":"desc","search_string":null,"device_state":"all","is_archived":false,"paginate":true,"append_fields":["active_polling","attributes","tied_point"],"per_page":10} 
      })
        .then(function (res) {
          console.log(res);
          setDevices(res.toString());
          // это мой код надо удалить setDevice(localStorage.getItem('acess_token', JSON.parse(res.token)));
        }).catch(function (err) {
          console.log(err);
      });
      // setDevices(... fetched devices);
    }
  }, []); 

  return <div>{devices.length === 0 ? <div>no devices</div> : devices.map(device => <div>{device.name}</div>)}</div>


}

export default DevicesList;