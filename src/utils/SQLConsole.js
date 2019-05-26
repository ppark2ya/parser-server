export default (NAMESPACE, TAG, SQL) => {
  console.log("########################################");
  console.log(
    `${NAMESPACE} - [${TAG} START]\n${SQL}\n${NAMESPACE} - [${TAG} END]`
  );
  console.log("########################################");
};
