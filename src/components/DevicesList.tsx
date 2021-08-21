import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { InterfaceDevice } from "../types";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const DevicesList = () => {
  const [devices, setDevices] = useState<InterfaceDevice[]>("");

  const history = useHistory();

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    } else {
      axios({
        method: "post",
        url: "https://core.nekta.cloud/api/device/metering_devices",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          page: 1,
          last_page: 0,
          sort_field: "id",
          sort: "desc",
          search_string: null,
          device_state: "all",
          is_archived: false,
          paginate: true,
          append_fields: ["active_polling", "attributes", "tied_point"],
          per_page: 10,
        },
      })
        .then(function (res) {
          console.log("response", res.data.data.metering_devices.data);
          setDevices(res.data.data.metering_devices.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [history]);

  const classes = useStyles();

  return (
    <>
      {devices.length === 0 ? (
        <div>no devices</div>
      ) : (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Название</TableCell>
                  <TableCell align="right">Дата последней активности</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell component="th" scope="row">
                    {device.id}
                    </TableCell>
                    <TableCell align="right">{device.name}</TableCell>
                    <TableCell align="right">{device.last_active}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
  )

};

export default DevicesList;
