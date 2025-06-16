import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { cities, type City } from "@/components/CitySelector";

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
};

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);

  // Загружаем сохраненный город из localStorage при инициализации
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      try {
        const cityData = JSON.parse(savedCity);
        const city = cities.find((c) => c.id === cityData.id);
        if (city) {
          setSelectedCityState(city);
        } else {
          // Если сохраненный город не найден, выбираем Ниж��ий Новгород по умолчанию
          setSelectedCityState(cities[0]);
        }
      } catch (error) {
        console.error("Ошибка при загрузке сохраненного города:", error);
        setSelectedCityState(cities[0]); // Нижний Новгород по умолчанию
      }
    } else {
      setSelectedCityState(cities[0]); // Нижний Новгород по умолчанию
    }
  }, []);

  const setSelectedCity = (city: City) => {
    setSelectedCityState(city);
    localStorage.setItem(
      "selectedCity",
      JSON.stringify({ id: city.id, name: city.name }),
    );
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
