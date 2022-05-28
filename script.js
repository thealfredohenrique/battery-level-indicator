const initBattery = async () => {
  const batteryLiquid = document.querySelector(".battery__liquid");
  const batteryStatus = document.querySelector(".battery__status");
  const batteryPercentage = document.querySelector(".battery__percentage");

  const battery = await navigator.getBattery();

  const updateBattery = () => {
    let level = Math.floor(battery.level * 100);

    batteryPercentage.innerHTML = level + "%";
    batteryLiquid.style.height = level + "%";

    if (level === 100) {
      batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill green-color"></i>`;
    } else if (level <= 20 && !battery.charging) {
      batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
    } else if (battery.charging) {
      batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
    } else {
      batteryStatus.innerHTML = "";
    }

    if (level <= 20) {
      batteryLiquid.classList.add("red-color-gradient");
      batteryLiquid.classList.remove(
        "orange-color-gradient",
        "yellow-color-gradient",
        "green-color-gradient"
      );
    } else if (level <= 40) {
      batteryLiquid.classList.add("orange-color-gradient");
      batteryLiquid.classList.remove(
        "red-color-gradient",
        "yellow-color-gradient",
        "green-color-gradient"
      );
    } else if (level <= 80) {
      batteryLiquid.classList.add("yellow-color-gradient");
      batteryLiquid.classList.remove(
        "red-color-gradient",
        "orange-color-gradient",
        "green-color-gradient"
      );
    } else {
      batteryLiquid.classList.add("green-color-gradient");
      batteryLiquid.classList.remove(
        "red-color-gradient",
        "orange-color-gradient",
        "yellow-color-gradient"
      );
    }
  };

  updateBattery();

  battery.addEventListener("chargingchange", updateBattery);
  battery.addEventListener("levelchange", updateBattery);
};

initBattery();
