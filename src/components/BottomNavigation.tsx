import { User, MapPin, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  currentPage: "home" | "profile" | "franchise";
}

export const BottomNavigation = ({ currentPage }: BottomNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    {
      id: "profile",
      label: "Профиль",
      icon: User,
      onClick: () => navigate("/profile"),
    },
    {
      id: "franchise",
      label: "Франшиза",
      icon: MapPin,
      onClick: () => navigate("/franchise"),
    },
    {
      id: "home",
      label: "Главная",
      icon: Home,
      onClick: () => navigate("/"),
    },
  ];

  return (
    <div className="bg-mariko-dark">
      <div className="flex justify-around items-end relative">
        {navItems.map((item) => {
          const isActive = item.id === currentPage;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center py-4 px-6 transition-all duration-200",
                isActive && "relative",
              )}
            >
              {isActive && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-t-[40px] px-8 py-3 shadow-lg">
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-8 h-8 text-white" />
                    <span className="text-white font-el-messiri text-sm font-semibold whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </div>
              )}

              {!isActive && (
                <>
                  <Icon className="w-6 h-6 text-mariko-text-secondary mb-1" />
                  <span className="text-mariko-text-secondary font-el-messiri text-xs font-medium">
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Brand */}
      <div className="text-center py-4 border-t border-mariko-text-secondary/20">
        <span className="text-mariko-text-secondary font-normal text-base tracking-wide">
          @Mariko_Bot
        </span>
      </div>
    </div>
  );
};
