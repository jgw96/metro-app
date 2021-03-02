export const getLocation = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const savedLoc = sessionStorage.getItem("location");

    if (savedLoc) {
      resolve(savedLoc);
    } else {
      try {
        navigator.geolocation.getCurrentPosition(async (pos: any) => {
          console.log(pos);
          const location = `${pos.coords.latitude},${pos.coords.longitude}`;
          console.log(location);

          sessionStorage.setItem("location", location);

          resolve(location);
        });
      } catch (err) {
        reject(err);
      }
    }
  });
};

export const updateSavedLoc = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(async (pos: any) => {
        const location = `${pos.coords.latitude},${pos.coords.longitude}`;
        sessionStorage.setItem("location", location);
        resolve(location);
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  })
}

export const getSavedLoc = () => {
  const savedLoc = sessionStorage.getItem("location");
  
  if (savedLoc) {
    return savedLoc;
  } else {
    return null;
  }
};
