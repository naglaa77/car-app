import {CarProps, FilterProps} from "@/types";

export async function fetchCars(filters:FilterProps) {
  const {manufacture,year,model,limit,fuel} = filters
  const headers = {
    "X-RapidAPI-Key": "28e4ae9574msh7518f9ed5e91f0dp122632jsnaf8c0b6fc62f",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacture}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers: headers,
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

// calculate price of rent car
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/get-image");
  const { make, year, model } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};


export const updateSearchParams = (type: string, value: string) => {
  // Create a new URLSearchParams object based on the current URL's search parameters
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter 'type' with the provided 'value'
  searchParams.set(type, value);

  // Create a new URL path by combining the current pathname and the updated search parameters
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  // Return the newly constructed URL path with updated search parameters
  return newPathname;
};
