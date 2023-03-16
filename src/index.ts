import { InfluxDB, Point } from '@influxdata/influxdb-client'


/** Environment variables **/
const url = "https://us-east-1-1.aws.cloud2.influxdata.com/"
const token = "kvDV92mC_EtClcWWvgYI-j1eYXTx5zjRVYAAqifDmBDQRKM2tyW0R-x-oKocMGv1oYhuo6qmjcRq86h6uednXQ=="
const org = "smartmeters.iot@gmail.com"
const bucket = "project"

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 **/
const influxDB = new InfluxDB({ url, token })

/**
 * Create a write client from the getWriteApi method.
 * Provide your `org` and `bucket`.
 **/
const writeApi = influxDB.getWriteApi(org, bucket)

const axios = require('axios');

interface blynkResponse {
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    v5: number;
    v6: number;
}



function intervalFunc() {
    axios.get('https://blynk.cloud/external/api/get?token=CWQjL7Gm_Kmh0qpa0jCf-2CNjdhMCUc2&v1&v2&v3&v4&v5&v6')
        .then((response: { data: blynkResponse }) => {
            console.log(response.data);
            const point1 = new Point('temperature')
                .floatField('value', response.data.v1)

            const point2 = new Point('humidity')
                .floatField('value', response.data.v2)

            const point3 = new Point('voltage')
                .floatField('value', response.data.v3)

            const point4 = new Point('current')
                .floatField('value', response.data.v4)

            const point5 = new Point('power')
                .floatField('value', response.data.v5)

            const point6 = new Point('energy')
                .floatField('value', response.data.v6)

            writeApi.writePoint(point6)
            writeApi.writePoint(point5)
            writeApi.writePoint(point4)
            writeApi.writePoint(point3)
            writeApi.writePoint(point2)
            writeApi.writePoint(point1)

            /**
             * Flush pending writes and close writeApi.
             **/

        })

}
setInterval(intervalFunc, 5000);
