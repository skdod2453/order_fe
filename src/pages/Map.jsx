import React, { useEffect, useRef } from 'react';
import * as restaurant from '../apis/restaurant';
import { ImLocation2 } from "react-icons/im";
import { PiMouseMiddleClickDuotone } from "react-icons/pi";
import '../css/Map.css';

export default function Map() {
    const mapElement = useRef(null); // 지도 엘리먼트를 참조하기 위한 ref
    const mapRef = useRef(null); // map을 참조하기 위한 ref

    useEffect(() => {
        const { naver } = window;

        // 네이버 지도 API가 로드되었는지 확인
        if (!naver || !mapElement.current) return;

        const mapOptions = {
            center: new naver.maps.LatLng(36.335536, 127.457975), // 초기 중심 좌표
            zoom: 15, // 초기 줌 레벨
        };

        // 지도 생성
        mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);

        // 현재 위치 가져오기
        const addCurrentLocationMarker = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        // 현재 위치 마커 추가
                        const currentLocationMarker = new naver.maps.Marker({
                            position: new naver.maps.LatLng(latitude, longitude),
                            map: mapRef.current,
                            icon: {
                                content: `<div style="color:blue; font-size:20px;">📍</div>`, // 커스텀 마커
                            },
                            title: "현재 위치",
                        });

                        // 현재 위치로 지도 중심 이동
                        mapRef.current.setCenter(new naver.maps.LatLng(latitude, longitude));

                        // 현재 위치에 인포윈도우 추가
                        const infowindow = new naver.maps.InfoWindow({
                            content: `<div style="padding:5px;">현재 위치</div>`,
                        });

                        // 마커 클릭 시 인포윈도우 표시
                        naver.maps.Event.addListener(currentLocationMarker, "click", function () {
                            infowindow.open(mapRef.current, currentLocationMarker);
                        });
                    },
                    (error) => {
                        console.error("현재 위치를 가져올 수 없습니다.", error);
                    }
                );
            } else {
                console.error("Geolocation API를 지원하지 않습니다.");
            }
        };

        const getAllAddress = async () => {
            try {
                const response = await restaurant.getAllAddress();
                const data = response.data; // 응답에서 데이터를 추출

                if (data && data.length > 0) {
                    data.forEach((item) => {
                        const { x, y, restaurantId, restaurantName, restaurantCategory, restaurantAddress, restaurantPhone, restaurantStoredFilePath } = item;

                        if (x && y) {
                            // 마커 추가
                            const marker = new naver.maps.Marker({
                                position: new naver.maps.LatLng(x, y), // LatLng은 (위도, 경도) 순서로 전달
                                map: mapRef.current, // 마커를 표시할 지도 객체
                            });

                            // 클릭 이벤트 추가
                            const infowindow = new naver.maps.InfoWindow({
                                content: `
                                <div class="card h-100 d-flex justify-content-center text-center" style="width: 20rem;">
                                    <img
                                        src="${
                                          restaurantStoredFilePath
                                            ? restaurantStoredFilePath.startsWith('http')
                                              ? restaurantStoredFilePath
                                              : process.env.PUBLIC_URL + restaurantStoredFilePath.replace('/Users/sungjae/order/order_fe/public', '')
                                            : ''
                                        }"
                                        class="card-img-top"
                                        alt="storedFilePath"
                                        style="height: 13rem;"
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">${restaurantName}</h5>
                                        <p class="card-text">${restaurantCategory}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">${restaurantPhone !== "" ? restaurantPhone : '전화 번호 없음'}</li>
                                        <li class="list-group-item" style="height: 4rem;">${restaurantAddress}</li>
                                    </ul>
                                    <div class="card-body">
                                        <a href="/detail/${restaurantId}" class="btn bg-warning-subtle text-warning-emphasis" tabindex="-1" role="button" aria-disabled="true" style>주문</a>
                                    </div>
                                </div>`
                            });

                            // 마커 클릭 시 인포윈도우 열기
                            naver.maps.Event.addListener(marker, 'click', () => {
                                infowindow.open(mapRef.current, marker.getPosition());
                            });
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllAddress();
        addCurrentLocationMarker(); // 현재 위치 마커 추가
    }, []);
    


    return (
        <div className="mmm">
            <p className='name'>
                📍 : 현재 위치, <ImLocation2 style={{color: 'blue'}}/> : 가게
            </p>
            <p className='smallname'>
            <PiMouseMiddleClickDuotone /> 마우스 휠로 확대·축소 가능하며, 파란 아이콘을 클릭하면 가게 정보가 표시됩니다.  <PiMouseMiddleClickDuotone />
            </p>
            <div
                ref={mapElement}
                className="map-container"
            />
        </div>
    );
}
