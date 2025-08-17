export const fetchRecentlyUploaded = async () => {
  try {
    const response = await fetch("/json/RecentlyUploaded.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recently uploaded products:", error);
    return [];
  }
};
