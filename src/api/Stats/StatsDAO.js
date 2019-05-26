import mybatisMapper from "mybatis-mapper";

const NAMESPACE = "StatsMapper";
const MAPPER_URL = `mapper/${NAMESPACE}.xml`;
mybatisMapper.createMapper([MAPPER_URL]);

const format = {
  language: "sql",
  indent: "  "
};
