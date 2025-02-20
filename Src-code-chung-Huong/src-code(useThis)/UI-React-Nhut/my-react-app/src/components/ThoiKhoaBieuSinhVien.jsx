import { useEffect, useState } from "react";

const ThoiKhoaBieuSinhVien = ({ reload }) => {
  const [thoiKhoaBieu, setThoiKhoaBieu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Call api get registed "NhomHoc" and "Related information";
  useEffect(() => {
    fetch(
      "http://localhost:8080/api/dangkyhocphan/layNhomHocTheoMSSV?maSinhVien=b2110947"
    )
      .then((response) => response.json())
      .then((data) => {
        setThoiKhoaBieu(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      });
  }, [reload]);

  // Matrix 6 Column (Monday - Saturday) + 10 rows (Lesson 1 - Lesson 10)
  const timetable = Array(10)
    .fill(null)
    .map(() => Array(6).fill(null));

  // Fill data subject to matrix "ThoiKhoaBieu"
  thoiKhoaBieu.forEach((nhom) => {
    for (let i = 0; i < nhom.soTiet; i++) {
      timetable[nhom.tietBatDau - 1 + i][
        nhom.thu - 2
      ] = `${nhom.phongHoc} - ${nhom.hocPhan.maHocPhan} - ${nhom.hocPhan.tenHocPhan}`;
    }
  });

  const handleDelete = (idNhomHoc) => {
    console.log("Deleting item with key:", idNhomHoc);
    fetch(
      `http://localhost:8080/api/dangkyhocphan?iddangKyHocPhan=${idNhomHoc}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log(`Deleted item: ${idNhomHoc}`);

          // Cập nhật danh sách sau khi xóa
          setThoiKhoaBieu((prev) =>
            prev.filter((nhom) => nhom.idDangKyHocPhan !== idNhomHoc)
          );

          // Gọi lại API để lấy danh sách mới
          fetch(
            "http://localhost:8080/api/dangkyhocphan/layNhomHocTheoMSSV?maSinhVien=b2110947"
          )
            .then((response) => response.json())
            .then((data) => {
              setThoiKhoaBieu(data);
            })
            .catch((error) =>
              console.error("Lỗi khi làm mới danh sách:", error)
            );
        } else {
          console.error("Lỗi khi xóa nhóm học");
        }
      })
      .catch((error) => console.error("Lỗi khi gọi API xóa:", error));
  };

  return (
    <div>
      <h1>Thời Khóa Biểu</h1>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          {/* Hiển thị dạng bảng */}
          <table
            border="1"
            cellPadding="5"
            cellSpacing="0"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Tiết</th>
                <th>Thứ 2</th>
                <th>Thứ 3</th>
                <th>Thứ 4</th>
                <th>Thứ 5</th>
                <th>Thứ 6</th>
                <th>Thứ 7</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {row.map((cell, i) => (
                    <td key={i} style={{ textAlign: "center" }}>
                      {cell || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Hiển thị dạng danh sách */}
          <h1>Thời Khóa Biểu Dạng List</h1>
          <ul>
            {thoiKhoaBieu.map((nhom) => (
              <li key={nhom.idDangKyHocPhan}>
                <strong>{nhom.maNhom}</strong> - Thứ {nhom.thu}, Tiết{" "}
                {nhom.tietBatDau} - {nhom.phongHoc} - {nhom.hocPhan.maHocPhan} -{" "}
                {nhom.hocPhan.tenHocPhan}
                <button
                  onClick={() => handleDelete(nhom.idDangKyHocPhan)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ThoiKhoaBieuSinhVien;
