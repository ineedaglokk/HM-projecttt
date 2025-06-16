import { Car, Bike, CircleDot, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { ActionButton } from "@/components/ActionButton";
import { BottomNavigation } from "@/components/BottomNavigation";

const Delivery = () => {
  return (
    <div className="min-h-screen bg-mariko-primary overflow-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-6 max-w-6xl mx-auto w-full">
        {/* Location Banner */}
        <div className="mt-8 md:mt-12 flex items-center justify-between gap-4">
          <div className="flex-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2812f8c2673606b4f69890ad4c064c85ff37ee30?placeholderIfAbsent=true"
              alt="Хачапури логотип"
              className="w-full h-auto max-w-md"
            />
          </div>
          <div className="flex items-center gap-2 text-white font-el-messiri text-2xl md:text-3xl font-semibold tracking-tight">
            <div>
              Нижний Новгород
              <br />
              Рождественская, 39
            </div>
            <MapPin className="w-16 h-16 md:w-20 md:h-20 text-white flex-shrink-0" />
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mt-8 md:mt-12 space-y-6 md:space-y-8">
          <ActionButton
            icon={<Car className="w-full h-full" />}
            title="Доставка Марико"
            onClick={() => console.log("Доставка Марико")}
          />

          <ActionButton
            icon={<Bike className="w-full h-full" />}
            title="Самовывоз"
            onClick={() => console.log("Самовывоз")}
          />

          <ActionButton
            icon={
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8fb69a54dd17376a9b06711103d33471ccbe2cb7?placeholderIfAbsent=true"
                  alt="Яндекс Еда"
                  className="w-16 h-16 object-contain"
                />
              </div>
            }
            title="Яндекс Еда"
            onClick={() => console.log("Яндекс Еда")}
          />

          <ActionButton
            icon={
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e46aa72fcfd3aa8f0cfa3cac579108968ad4d2b?placeholderIfAbsent=true"
                  alt="Delivery Club"
                  className="w-full h-full object-cover rounded-[90px_0_90px_90px]"
                />
              </div>
            }
            title="Delivery Club"
            onClick={() => console.log("Delivery Club")}
          />
        </div>

        {/* Decorative Delivery Truck Image */}
        <div className="mt-12 md:mt-20 flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/093934205b7e6b614cb384b055954bd8bd17366c?placeholderIfAbsent=true"
            alt="Грузовик доставки"
            className="w-full h-auto max-w-xs"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="home" />
    </div>
  );
};

export default Delivery;
