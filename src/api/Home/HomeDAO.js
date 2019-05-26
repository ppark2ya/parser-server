import mybatisMapper from "mybatis-mapper";
import SQLConsole from "../../utils/SQLConsole";

const NAMESPACE = "HomeMapper";
const MAPPER_URL = `mapper/${NAMESPACE}.xml`;
mybatisMapper.createMapper([MAPPER_URL]);

const format = {
  language: "sql",
  indent: "  "
};

export const getUserAuthentication = param => {
  const QUERY = "getUserAuthentication";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};

export const getHomeDashboard = param => {
  const QUERY = "getHomeDashboard";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};
