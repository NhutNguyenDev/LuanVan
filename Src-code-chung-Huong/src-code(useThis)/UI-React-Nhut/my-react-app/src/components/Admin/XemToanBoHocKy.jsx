import { useState, useEffect } from "react";

const XemToanBoHocKy = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/hocky")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div>
      <h1>Component hiển thị tất cả học kỳ - các môn trong học kỳ đó - các nhóm của mỗi môn - sinh viên của mỗi nhóm</h1>
      {data.map((hocKy, index) => (
        <div key={hocKy.maHocKy}>
          <h2 onClick={() => toggleExpand(index)} style={{ cursor: "pointer" }}>
            {hocKy.tenHocKy} ({hocKy.namHoc})
          </h2>
          {expanded === index && (
            <div style={{ paddingLeft: "20px" }}>
              {hocKy.hocKyMonHocs.length > 0 ? (
                hocKy.hocKyMonHocs.map((monHoc) => (
                  <div key={monHoc.maHocPhan}>
                    <h3>{monHoc.maHocPhan}</h3>
                    {monHoc.nhomHocs.length > 0 ? (
                      <ul>
                        {monHoc.nhomHocs.map((nhom) => (
                          <li key={nhom.idNhomHoc}>
                            {`Thứ ${nhom.thu}, Tiết ${nhom.tietBatDau} - ${nhom.soTiet}, ${nhom.phongHoc} (SL: ${nhom.soLuongSV})`}
                            {nhom.dangKyHocPhans.length > 0 ? (
                              <ul>
                                {nhom.dangKyHocPhans.map(
                                  (sinhVien, svIndex) => (
                                    <li key={svIndex}>{sinhVien.maSinhVien}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <p>Không có sinh viên đăng ký</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có nhóm học</p>
                    )}
                  </div>
                ))
              ) : (
                <p>Không có môn học</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default XemToanBoHocKy;
