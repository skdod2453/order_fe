import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Pay() {
    const [cookies] = useCookies(['Authorization']);
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
        document.head.removeChild(jquery);
        document.head.removeChild(iamport);
        };
    }, []);

    const requestPay = () => {

        const { IMP } = window;
        IMP.init('imp34231871'); // 가맹점 식별 코드

        IMP.request_pay({
        pg: 'kakaopay.TC0ONETIME',
        pay_method: 'card',
        merchant_uid: new Date().getTime(),
        name: '테스트 상품',
        amount: 1004,
        buyer_email: 'test@naver.com',
        buyer_name: '코드쿡',
        buyer_tel: '010-1234-5678',
        }, async (rsp) => {
        if (rsp.success) {
            try {
                console.log(cookies.Authorization)
                const { data } = await axios.post(
                    'http://43.202.86.72:8080/pay/verify/' + rsp.imp_uid,
                    {}, // 빈 본문, 본문 데이터가 필요하지 않다면 빈 객체 사용
                    {
                        headers: {
                            Authorization: `Bearer ${cookies.Authorization}`, // JWT 토큰 추가
                        }
                    }
                );
            console.log(data); // 응답 데이터 구조 확인
            
            if (rsp.paid_amount === data.response.amount) {
                alert('결제 성공');
            } else {
                alert('결제 실패');
            }
            } catch (error) {
            console.error('Error while verifying payment:', error);
            alert('결제 검증 중 오류 발생: ' + error.message);
            }
        } else {
            alert('결제 실패: ' + rsp.error_msg);
        }
        });
    };

    return (
        <div>
        <button onClick={requestPay}>결제하기</button>
        </div>
    );
};