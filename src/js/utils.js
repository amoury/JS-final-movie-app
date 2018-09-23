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

export const shortenString = (paragraph, characters) => {
  console.log(paragraph.split(".").splice(20).join(" "));
  return paragraph.split(". ").splice(0, 3).join(". "); 
}