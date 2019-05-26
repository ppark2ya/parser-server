import moment from "moment";
import withCheckAuth from "../../utils/withCheckAuth";
import { getHomeDashboard } from "./HomeDAO";

const resolvers = {
  Query: {
    dashboard: async (_, { uid, auth }) => {
      console.log(`uid: ${uid}, auth: ${auth}`);

      const [year, month] = moment()
        .format("YYYY-MM")
        .split("-");

      let date = "";
      if (Number(month) <= 1) {
        date = Number(year) - 1 + "1201";
      } else {
        const exMon = Number(month) - 1;
        const strMonth = exMon >= 10 ? exMon : "0" + exMon;
        date = `${year}${strMonth}01`;
      }

      let params = {
        uid,
        auth,
        date
      };

      try {
        const rows = await withCheckAuth(params, getHomeDashboard);

        const chartData = rows
          .map(({ serviceCd, cnt, week }, idx) => {
            let renewData = {};
            let serviceModel = {};

            if (idx % (rows.length / 4) === 0) {
              renewData.week = `${week}주차`;
            }

            const serviceNm =
              serviceCd === "00"
                ? "ZABBIX"
                : serviceCd === "01"
                ? "POSTMAN"
                : serviceCd === "02"
                ? "SEFILCARE"
                : serviceCd === "03"
                ? "CHECKSERVER"
                : "NOT EXIST";

            serviceModel[serviceNm] = cnt;

            if ((idx + 1) % (rows.length / 4) === 0) {
              renewData.data = serviceModel;
              return renewData;
            }
          })
          .filter(f => f);

        console.log("HOME - [DASHBOARD SUCCESS]: ", chartData);
        return chartData;
      } catch (err) {
        console.error(`HOME - [DASHBOARD ERROR]: ${err}`);
        return false;
      }
    }
  }
};

export default resolvers;
