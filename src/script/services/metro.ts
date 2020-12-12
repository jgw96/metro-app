const subKey = "d3AEXSjTLWi7zaPiRrRNaMxNO4GtZ366avMgDoZmm3U";

export async function getNearbyStops(locationString: string) {
  const idData = await getMetroAreaID(locationString);
  console.log(idData);

  const response = await fetch(
    `https://atlas.microsoft.com/mobility/transit/nearby/json?api-version=1.0&query=${locationString}&subscription-key=${subKey}&radius=${500}&metroId=${
      idData.results[0].metroId
    }`
  );
  const data = await response.json();
  console.log(data);

  return data.results;
}

export const getStopDetails = async (id: string) => {
    console.log(id);
  const response = await fetch(
    `https://atlas.microsoft.com/mobility/transit/stop/json?api-version=1.0&query=${id}&subscription-key=${subKey}&detailType=lines,lineGroups`
  );
  const data = await response.json();

  return data;
};

export const getRealTime = async (id: string) => {
    const response = await fetch(`https://atlas.microsoft.com/mobility/realtime/arrivals/json?api-version=1.0&query=${id}&subscription-key=${subKey}`);
    const data = await response.json();

    return data.results;
}

const getMetroAreaID = async (locationString: string) => {
  const response = await fetch(
    `https://atlas.microsoft.com/mobility/metroArea/id/json?api-version=1.0&query=${locationString}&subscription-key=${subKey}`
  );
  const data = await response.json();
  console.log(data);

  return data;
};
