import mybatisMapper from "mybatis-mapper";
import SQLConsole from "../../utils/SQLConsole";

const NAMESPACE = "GraphMapper";
const MAPPER_URL = `mapper/${NAMESPACE}.xml`;
mybatisMapper.createMapper([MAPPER_URL]);

const format = {
  language: "sql",
  indent: "  "
};

export const getSynthesisGraph = param => {
  const QUERY = "getSynthesisGraph";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};

export const getCheckServerGraph = param => {
  const QUERY = "getCheckServerGraph";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};

export const getSefilCareGraph = param => {
  const QUERY = "getSefilCareGraph";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};

export const getZabbixGraph = param => {
  const QUERY = "getZabbixGraph";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};

export const getZabbixGraphStatusNm = param => {
  const QUERY = "getZabbixGraphStatusNm";
  const sql = mybatisMapper.getStatement(NAMESPACE, QUERY, param, format);

  SQLConsole(NAMESPACE, QUERY, sql);
  return sql;
};
