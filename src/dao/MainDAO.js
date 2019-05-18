import mybatisMapper from "mybatis-mapper";
import pool from "../db";

const mapperURL = "mapper/MainMapper.xml";

mybatisMapper.createMapper([mapperURL]);

const format = {
  language: "sql",
  indent: "  "
};

const param = {
  serviceCd: "00"
};

const query = mybatisMapper.getStatement(
  "MainMapper",
  "getKeywordInfo",
  param,
  format
);
const dbTest = async () => {
  try {
    console.log(query);
    const connection = await pool.getConnection(async conn => conn);

    try {
      const [rows] = await connection.query(query);
      console.log("result: ", rows);
      connection.release();
    } catch (err) {
      console.error(`Query error: ${err}`);
      connection.release();
      return false;
    }
  } catch (err) {
    console.error(`DB error: ${err}`);
    return false;
  }
};
