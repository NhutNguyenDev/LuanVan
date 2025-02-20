import { useEffect, useState } from "react";

const HocPhanList = ({ onDangKySuccess }) => {
  const [hocPhanList, setHocPhanList] = useState([]);
  const [hocKy, setHocKy] = useState("HK1");
  //   Sinh vien set solid
  const sinhVien = "b2110947";
  const [idNhomDangKy, setIdNhomDangKy] = useState(null); // State to store selected idNhomHoc
  const [responseMessage, setResponseMessage] = useState(""); // Store API response

  const handleSelectChange = (event) => {
    setIdNhomDangKy(event.target.value); // Update state when user selects an option
  };

  //
  useEffect(() => {
    fetch(
      `http://localhost:8080/api/hockymonhoc/KhongSinhVien?maHocKy=${hocKy}`
    )
      .then((response) => response.json())
      .then((data) => setHocPhanList(data))
      .catch((error) =>
        console.error(
          "Lỗi các học phần có thể đăng ký - KHÔNG LOAD ĐƯỢC :",
          error
        )
      );
  }, [hocKy]);

  // Because api "dangKyHocPhan" use "idNhomHoc" to register instead use "MaNhom".
  const handleDangKy = async () => {
    console.log(
      "Sinh Viên:",
      sinhVien,
      "Thực hiện đăng ký học phần id:",
      idNhomDangKy
    );

    const requestData = {
      idNhomHoc: parseInt(idNhomDangKy),
      maSinhVien: sinhVien,
    };

    try {
      const response = await fetch("http://localhost:8080/api/dangkyhocphan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      const responseData = await response.json(); 
      console.log("Response Data:", responseData);

      alert("Đăng ký thành công !!!");
      onDangKySuccess(); 

    } catch (error) {
      console.log("Lỗi khi đăng ký học phần:", error);
      alert(
        "Không thể đăng ký: Trùng thời khóa biểu."
      );
    }
  };

  return (
    <div>
      <p>
        Hiển thị các môn có trong<br></br>- Nhà trường mở trong học kỳ này
        <br></br>- Sinh viên đăng ký trong KHHT
        <br></br>- Vào trang này khi đã đăng nhập và có biến thông tin của sinh
        Viên: B2110947
      </p>
      <h1>Tài khoản sinh viên : B2110947</h1>
      <h2>Đăng ký học phần Học kỳ: {hocKy}</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã Học Phần</th>
            <th>Tên Học Phần</th>
            <th>Nhóm Học</th>
            <th>Số Tín Chỉ</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {hocPhanList.map((hocPhan, index) => (
            <tr key={hocPhan.maHocPhan}>
              <td>{index + 1}</td>
              <td>{hocPhan.maHocPhan}</td>
              <td>{hocPhan.hocPhan.tenHocPhan}</td>
              <td>
                <select onChange={handleSelectChange}>
                  <option value="">Chọn nhóm học</option>
                  {hocPhan.nhomHocs.map((nhom) => (
                    <option key={nhom.idNhomHoc} value={nhom.idNhomHoc}>
                      Thứ: {nhom.thu} - Tiết: {nhom.tietBatDau}
                      {nhom.tietBatDau + 1}
                      {nhom.tietBatDau + 2} - ID: {nhom.idNhomHoc} -{" "}
                      {nhom.phongHoc}
                    </option>
                  ))}
                </select>
              </td>
              <td>{hocPhan.hocPhan.soTinChi}</td>
              <td>
                <button onClick={() => handleDangKy(idNhomDangKy)}>
                  Đăng ký
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HocPhanList;
