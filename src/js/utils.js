export const cleanURL = url => {
  return url.replace(/\/$/, "");
};

export const getIdFromURL = url => {
  console.log(url);
  return url.split("/")[url.split("/").length - 1];

}

export const cleanPathName = path_name => {
  const regex = /(^\/|\.jpg\/)/gi;
  const path = path_name.replace(regex, "");
  return path.split('.')[0];
}