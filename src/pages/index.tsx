
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import { useState } from "react";
import * as stores from "@/data/store_data.json";
import StoreBox from "@/components/StoreBox";


export default function Home() {

  const [map, setMap] = useState('');
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores["DATA"];

  return (
    <>
      <Map setMap={setMap} />
      <Marker map={map} storeDatas={storeDatas} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>

  ) ;
}


export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  }; // 60분마다 갱신
}
