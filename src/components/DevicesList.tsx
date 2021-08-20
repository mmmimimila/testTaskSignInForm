import React, {useEffect, useState} from "react";
import axios from "axios";

// const raw = localStorage.getItem('person')
// const person = JSON.parse(raw)


export const DevicesList = () => {
  // const [device, setDevice] = useState<string>('');
  
  useEffect(() => {
    (
      axios({
        method: 'get',
        url: 'login',
        headers: {
          Authorization: 'Bearer' + JSON.parse(localStorage.getItem('token'))
        }
        // responseType: 'stream'
      })
        .then(function (res) {
          console.log(res);
          // setDevice(localStorage.getItem('acess_token', JSON.parse(res.token)));
        }).catch(function (err) {
          console.log(err);
      }))();
});

  
  
  
  // const data = {
  //   email,
  //   password,
  //   "personal_data_access": true
  // }

  // axios.post('devicesList', data).then(function (res) {
  //   console.log(res);;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  return (
    <>
      {/* <div>hello, it's DevicesList {device}</div> */}
      <div>hello, it's DevicesList</div>
    </>
  );
}

export default DevicesList;