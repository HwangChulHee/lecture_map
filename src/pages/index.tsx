
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import { useState } from "react";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";


export default function Home({ stores }: { stores: StoreType[] }) {

  const [map, setMap] = useState('');
  const [currentStore, setCurrentStore] = useState(null);

  return (
    <>
      {/* api 로부터 맵 객체를 가져온다. */}
      <Map setMap={setMap} />

      {/* 맵 객체를 지도-식당 정보 데이터(storeDatas)를 통해 마커를 그려준다. */}
      <Marker map={map} stores={stores} setCurrentStore={setCurrentStore} />

      {/* 마커를 눌렀을 때, 해당 마커에 해당하는 식당 정보를 보여준다. */}
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>

  ) ;
}

// api를 통해 map 객체를 받아온다. 60분마다 갱신하도록 한다.
export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  }; // 60분마다 갱신
}
