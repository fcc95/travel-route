import axios from "axios";

export type CountryApiData = {
  cca2: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
};

export type CountryResult = {
  id: string;
  name: string;
  thumbnail: string;
};

export const fetchCountries = async (
  name: string
): Promise<CountryResult[]> => {
  const { data } = await axios.get(
    `https://restcountries.com/v3.1/name/${name}`,
    { params: { fields: "name,cca2,flags" } }
  );

  return data.map((country: CountryApiData) => ({
    id: country.cca2,
    name: country.name.common,
    thumbnail: country.flags.png,
  }));
};
