#### 재난 문자 시각화 및 이용성 증대 프로젝트

<hr>

**완료 상황**

1. 게시판 API 추출 후 이용 => 2020-07-08~08-08 게시판 데이터 JSON DB화 => 20200830 REDIS , MySQL으로 옮김

2. Front/Backend : 지도-검색 연동 실시간 재난 현황 update
    ![키워드_검색](https://user-images.githubusercontent.com/26922008/89745370-53218a00-daee-11ea-9253-62e02b9bf492.PNG)

3. 지도 : 재난문자 현황에 따른 색 변화
    ![image](https://user-images.githubusercontent.com/26922008/90306761-32e93500-df0b-11ea-9b21-2127c44c27f2.png)

4. 그래프
    * 한달간 총 재난문자 발생현황
    * 지역 재난 문자 발생현황
    ![재난 그래프](https://user-images.githubusercontent.com/26922008/91023067-04690980-e631-11ea-9ba2-c583b40688a5.png)

5. 2020.08.28 구독 서비스 / 오늘의 키워드
    * 구독자 데이터가 저장된 mysql과 연결
    ![구독_오늘의키워드](https://user-images.githubusercontent.com/26922008/91542568-0563a900-e959-11ea-8da8-e2b3626b62cc.PNG)

6. 구독서비스 메일링 : 오류 발견, 배포 미뤄둠
    ![1](https://user-images.githubusercontent.com/26922008/91650170-36f28680-eab7-11ea-8764-a7ae734e08f0.jpg)
    ![2](https://user-images.githubusercontent.com/26922008/91650171-378b1d00-eab7-11ea-9cf7-782b123300e6.jpg)

**To Do List**

1. heroku 배포시 timezone 문제 , heroku config:add TZ="Asia/Seoul" --app bdt-api
2. 프록시 서버를 통해 데이터를 받아와서 지도가 상당히 늦게 뜸 => redis에 미리 캐싱해두고 불러오기
3. 정상적으로 당일의 재난문자 카운트 값을 변경하는 배치 프로그램 확인해야함 => 확인완료
4. mysql에 저장한 유저에게 실시간 재난문자 현황 전송 배치 프로그램 작성해야함
5. 오늘의 키워드 자연어처리 모델 구축