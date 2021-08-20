// import { Devices } from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {InterfaceDevice} from "../types";

export const DevicesList = () => {
   const [devices, setDevices] = useState<InterfaceDevice[]>('');
  
   const history = useHistory();

  useEffect(() => {
    const token: any = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      history.push('/login');
    } else {
      axios({
        method: 'post',
        url: 'https://core.nekta.cloud/api/device/metering_devices',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {"page":1,"last_page":0,"sort_field":"id","sort":"desc","search_string":null,"device_state":"all","is_archived":false,"paginate":true,"append_fields":["active_polling","attributes","tied_point"],"per_page":10} 
      })
        .then(function (res) {
          console.log('response',res);
          setDevices(res.data.data.metering_devices.data);
        }).catch(function (err) {
          console.log(err);
      });
    }
  }, []); 

  return <div>{devices.length === 0 ? <div>no devices</div> : devices.map(device => <div>{device.name}</div>)}</div>


}

export default DevicesList;