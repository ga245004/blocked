import Rest from "fetch-on-rest";

const Api = new Rest("/api");

Api.getHash = hash => {
  return Api.get("getHash/" + (hash ? hash : ""));
};

Api.getLastHashKey = () =>{
    return Api.get("getLastHashKey");
}

export default Api;
