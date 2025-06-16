import { ChefHat } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-mariko-dark text-mariko-text-light px-3 py-4 md:px-6 md:py-8 flex items-center justify-between">
      <h1 className="text-sm md:text-3xl font-normal tracking-wide border border-mariko-text-light px-2 py-1 md:px-3 rounded">
        Хачапури Марико бот
      </h1>
      <ChefHat className="w-6 h-6 md:w-12 md:h-12 text-mariko-text-light flex-shrink-0" />
    </header>
  );
};
