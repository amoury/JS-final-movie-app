export const cleanURL = url => {
  return url.replace(/\/$/, "");
};

export const getIdFromURL = url => {
  return url.split("/")[url.split("/").length - 1];
}