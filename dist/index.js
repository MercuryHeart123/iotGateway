"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const influxdb_client_1 = require("@influxdata/influxdb-client");
/** Environment variables **/
const url = "https://us-east-1-1.aws.cloud2.influxdata.com/";
const token = "kvDV92mC_EtClcWWvgYI-j1eYXTx5zjRVYAAqifDmBDQRKM2tyW0R-x-oKocMGv1oYhuo6qmjcRq86h6uednXQ==";
const org = "smartmeters.iot@gmail.com";
const bucket = "project";
/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new influxdb_client_1.InfluxDB({ url, token });
/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
const writeApi = influxDB.getWriteApi(org, bucket);
const axios = require('axios');
function intervalFunc() {
    axios.get('https://blynk.cloud/external/api/get?token=CWQjL7Gm_Kmh0qpa0jCf-2CNjdhMCUc2&v1&v2&v3&v4&v5&v6')
        .then((response) => {
        console.log(response.data);
        const point1 = new influxdb_client_1.Point('temperature')
            .floatField('value', response.data.v1);
        const point2 = new influxdb_client_1.Point('humidity')
            .floatField('value', response.data.v2);
        const point3 = new influxdb_client_1.Point('voltage')
            .floatField('value', response.data.v3);
        const point4 = new influxdb_client_1.Point('current')
            .floatField('value', response.data.v4);
        const point5 = new influxdb_client_1.Point('power')
            .floatField('value', response.data.v5);
        const point6 = new influxdb_client_1.Point('energy')
            .floatField('value', response.data.v6);
        writeApi.writePoint(point6);
        writeApi.writePoint(point5);
        writeApi.writePoint(point4);
        writeApi.writePoint(point3);
        writeApi.writePoint(point2);
        writeApi.writePoint(point1);
        /**
         * Flush pending writes and close writeApi.
         **/
    });
}
setInterval(intervalFunc, 5000);
