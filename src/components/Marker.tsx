/*global kakao*/


import { StoreType } from "@/interface";
import { useEffect, Dispatch, SetStateAction, useCallback } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
    map: any;
    stores : any[];
    setCurrentStore : Dispatch<SetStateAction<any>>;
  }

// 맵 객체에 (api로부터 받아온) 지도-식당 정보를 기반으로 마커를 그려준다.
export default function Marker({map, stores, setCurrentStore} : MapProps) {

  const loadKakoMarkers = useCallback(() => {
    if (map) {
      stores?.map((store) => {
        var imageSrc = store?.bizcnd_code_nm
            ? `/images/markers/${store?.bizcnd_code_nm}.png`
            : "/images/markers/default.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          ),
          markerPosition = new window.kakao.maps.LatLng(
            store?.y_dnts,
            store?.x_cnts
          ); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
        var content = `<div class="infowindow">${store?.upso_nm}</div>`; // 인포윈도우에 표시될 내용

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
          console.log(`store 정보`, store);
        });

      });
    }

  }, [map, setCurrentStore, stores]);

  useEffect(() => {
    loadKakoMarkers();    
  }, [loadKakoMarkers, map]);
   

  return (
    <>
    </>
  );
  
}