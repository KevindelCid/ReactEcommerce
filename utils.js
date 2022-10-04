const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});

export default getConfig;
