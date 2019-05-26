import moment from "moment";
import withCheckAuth from "../../utils/withCheckAuth";
import {
  getSynthesisGraph,
  getCheckServerGraph,
  getSefilCareGraph,
  getZabbixGraph,
  getZabbixGraphStatusNm
} from "./GraphDAO";

const resolvers = {
  Query: {
    synthesisGraph: async (_, { uid, auth }) => {
      console.log(`uid: ${uid}, auth: ${auth}`);

      try {
        const dates = [
          moment()
            .subtract(3, "days")
            .format("YYYYMMDD"),
          moment()
            .subtract(2, "days")
            .format("YYYYMMDD"),
          moment()
            .subtract(1, "days")
            .format("YYYYMMDD"),
          moment().format("YYYYMMDD")
        ];

        const params = {
          uid,
          auth,
          dates
        };

        const rows = await withCheckAuth(params, getSynthesisGraph);

        const [zabbixList, postmanList, sefilcareList, checkServerList] = [
          [],
          [],
          [],
          []
        ];

        const [chartData] = rows
          .map(({ logType: type, cnt }, idx) => {
            switch (type) {
              case "ZABBIX": {
                zabbixList.push(cnt);
                break;
              }
              case "POSTMAN": {
                postmanList.push(cnt);
                break;
              }
              case "SEFILCARE": {
                sefilcareList.push(cnt);
                break;
              }
              case "CHECK_SERVER": {
                checkServerList.push(cnt);
                break;
              }
            }

            if (rows.length - 1 === idx) {
              return [
                {
                  label: "ZABBIX",
                  data: zabbixList,
                  backgroundColor: "#008ae6"
                },
                {
                  label: "POSTMAN",
                  data: postmanList,
                  backgroundColor: "#cecece"
                },
                {
                  label: "SEFILCARE",
                  data: sefilcareList,
                  backgroundColor: "#ffcc00"
                },
                {
                  label: "CHECK_SERVER",
                  data: checkServerList,
                  backgroundColor: "#ff6600"
                }
              ];
            }
          })
          .filter(f => f);

        console.log("GRAPH - [SYNTHESIS SUCCESS]: ", {
          labels: dates,
          chartData
        });
        return { labels: dates, chartData };
      } catch (err) {
        console.error(`GRAPH - [SYNTHESIS ERROR]: ${err}`);
        return false;
      }
    },
    checkServerGraph: async (_, { uid, auth }) => {
      const rows = await withCheckAuth({ uid, auth }, getCheckServerGraph);

      const chartData = rows.map(({ logType, cnt }) => {
        return {
          HTTPCode: logType,
          cnt
        };
      });
      console.log({ chartData });
      return {
        chartData
      };
    },
    sefilcareGraph: async (_, { uid, auth }) => {
      const rows = await withCheckAuth({ uid, auth }, getSefilCareGraph);

      return {
        chartData: rows
      };
    },
    zabbixGraph: async (_, { uid, auth }) => {
      const chartData = await withCheckAuth({ uid, auth }, getZabbixGraph);
      const statusNm = await withCheckAuth(
        { uid, auth },
        getZabbixGraphStatusNm
      );
      console.log({
        chartData,
        statusNm
      });

      return {
        chartData,
        statusNm
      };
    }
  }
};

export default resolvers;
