import pool from "../db";
import { getUserAuthentication } from "../api/Home/HomeDAO";

const withCheckAuth = async ({ uid, auth, ...params }, callback) => {
  // 기본 파라미터 세팅
  Object.assign(params, {
    ZABBIX: "",
    POSTMAN: "",
    SEFILCARE: "",
    CHECK_SERVER: ""
  });

  try {
    const connection = await pool.getConnection(async conn => conn);

    const [userAuth] = await connection.query(
      getUserAuthentication({ uid, auth })
    );

    const monitorServices = userAuth[0].description
      .replace(/(ADMIN\/|GUEST\/)/gi, "")
      .split("/");

    for (const serviceNm of monitorServices) {
      if (serviceNm === "ZABBIX") {
        params[serviceNm] = "00";
      } else if (serviceNm === "POSTMAN") {
        params[serviceNm] = "01";
      } else if (serviceNm === "SEFILCARE") {
        params[serviceNm] = "02";
      } else if (serviceNm === "CHECK_SERVER") {
        params[serviceNm] = "03";
      }
    }

    const [rows] = await connection.query(
      callback({
        ...params,
        uid,
        auth
      })
    );

    connection.release();
    return rows;
  } catch (err) {
    console.error(`UTILS - [WITH CHECK AUTH ERROR]: ${err}`);
    return false;
  }
};

export default withCheckAuth;
