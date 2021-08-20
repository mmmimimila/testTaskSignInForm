export interface InterfaceDevice {
  active: number;
  active_polling: boolean;
  address: {country: string; city: string; region: string; street: string; house: string;}
  archived_at: null
  attributes: {device_serial_number: string; date_calibration_device: number;}
  company_creator_id: number;
  created_at: number;
  creator_id: number;
  deleted_at: null;
  desc: null;
  deviceID: string;
  deviceTimezone: number;
  device_group_id: number;
  device_type_id: number;
  gatewayID: string;
  gateway_id: null
  id: number;
  impulse_weight: null
  inside_addr: string;
  interface_id: number;
  last_active: number;
  last_message: {tariff1: number; tariff2: number; tariff3: number; datetime: number; realdatetime: number;}
  last_message_type: null
  model_class_id: number;
  model_id: number;
  name: string;
  on_dashboard: boolean;
  port_addr: string;
  properties: {deviceID: string; poll_fields: [], selected_data: [], virtual_device_type: number;}
  protocol_id: number;
  report_period_update: number;
  starting_value: null;
  status: null;
  tied_point: {_id: string; parent_id: string; company_id: number;}
  transformation_ratio: null
}