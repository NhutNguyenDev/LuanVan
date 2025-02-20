import { useState } from "react";
import HocPhanList from "./HocPhanList";
import ThoiKhoaBieuSinhVien from "./ThoiKhoaBieuSinhVien";

const DangKyHocPhan = () => {
  const [reloadTKB, setReloadTKB] = useState(false); // State để reload thời khóa biểu

  // Hàm này sẽ được gọi khi đăng ký thành công
  const handleReloadTKB = () => {
    setReloadTKB((prev) => !prev); // Đảo trạng thái để trigger re-render TKB
  };

  return (
    <div>
      <HocPhanList onDangKySuccess={handleReloadTKB} />
      <ThoiKhoaBieuSinhVien reload={reloadTKB} />
    </div>
  );
};

export default DangKyHocPhan;
