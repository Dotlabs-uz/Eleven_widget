import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import { Skeleton, Stack } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineCheck, AiOutlineRight } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { motion } from "framer-motion";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import Head from "next/head";

function Index() {
  const searchParams = useSearchParams();

  const filName = searchParams.get("name");
  const filAdress = searchParams.get("address");
  const barberId = searchParams.get("barberId");
  const baseUrl =
    "https://starfish-app-f4ezq.ondigitalocean.app/services?listBarberId[$in][]=";

  const [servicesArr, setServicesArr] = useState<any>([]);
  const [active, setActive] = useState(false);
  const [selectedService, setSelectedService] = useState<any>([]);
  const [duration, setDuration] = useState<number>(0);
  const [btnActive, serBtnnActive] = useState(false);

  async function getServices() {
    try {
      const response = await axios(`${baseUrl}${barberId}`, {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI2NTRhMmJiMjYxMGU1ZDYyMjA2OThjODkiLCJwYXRoIjoibWFuYWdlcnMiLCJpYXQiOjE2OTkzNTk2OTAsImV4cCI6MTY5OTQ0NjA5MCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwianRpIjoiZTMwYzgzYjYtNTdhNC00ZGZkLWExMmItMGVhYzk0NzU5NTEwIn0._mO6UIe2wG2Ju3bYpeTGtpIdpZBmmY800BE_kLQ6Yng",
        },
      });
      setServicesArr(response.data.results);
      setActive(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setDuration(selectedService.reduce((a:any,b:any) => a + b.duration, 0))
  }, [selectedService])

  useEffect(() => {
    getServices();
  }, []);
  // console.log({duration}, {selectedService})

  const check = (item: any, e: any) => {
    if (e.target.checked === true) {
      setSelectedService([...selectedService, item]);          
    } else {
      setSelectedService(selectedService.filter((el:any) => el._id !== item._id));          
    }

    if (selectedService.length === 0) {
      serBtnnActive(false);
    } else {
      serBtnnActive(true);
    }
  };
  
  console.log({duration});
  return (
    <ChakraProvider>
      <AnimatePresence>
        <div className="w-full h-full max-w-[600px] mx-auto px-3 relative ">
          <Head>
            <link
              rel="shortcut icon"
              href="/images/logoReal.svg"
              type="image/x-icon"
            />
            <title>eleven 11</title>
          </Head>
          <div className=" flex items-center gap-2 w-full py-2  border-b-2 border-[#D7A92D] mb-3 ">
            <div className="w-8 h-9 flex items-center justify-center cursor-pointer ">
              <Link
                href={{
                  pathname: "/barbers",
                  query: {
                    name: searchParams.get("name"),
                    id: searchParams.get("filId"),
                    address: searchParams.get("address"),
                  },
                }}
              >
                <BsArrowLeft size="24px" className="text-white" />
              </Link>
            </div>
            <div className="">
              <h1 className=" text-lg sm:text-xl font-medium text-white  flex items-center gap-2 tracking-wider ">
                {filName}
              </h1>
              <span className=" text-base  font-normal text-[#808080]  ">
                {filAdress}
              </span>
            </div>
          </div>
          <h1 className="text-2xl text-white mb-2 ">Парикмахерские услуги</h1>
          <div className="w-full">
            {active ? (
              servicesArr.map((item: any, index: number) => (
                <label key={index} className="relative cursor-pointer">
                  <motion.div
                    initial={{ x: 0, y: 20, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, type: "tween" }}
                    whileTap={{ scale: 0.5 }}
                    className="w-full h-full mt-3 mx-auto"
                    key={index}
                  >
                    <div className="w-full  h-22 rounded-2xl border-2 border-[#D7A92D] mb-3  gap-4 p-4 cursor-pointer flex items-center justify-between ">
                      <div>
                        <h1 className=" text-base  sm:text-2xl font-medium text-white">
                          {item.name}
                        </h1>
                        <div className="w-full flex items-center gap-3 ">
                          <h2 className="text-white text-lg ">
                            {/* {item.price} сум.{" "} */}
                            {new Intl.NumberFormat("en-DE").format(item.price)} сум.
                          </h2>
                          <span className="text-[#808080]">
                            {item.duration} мин{" "}
                          </span>
                        </div>
                      </div>
                      <div className="bg-[#101010] border-2 border-[#D7A92D] w-12 h-12 rounded-full flex justify-center items-center ">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          name="size-choice"
                          onChange={(e) => check(item, e)}
                          id={item._id}
                        />
                        <AiOutlineCheck className="text-2xl text-[#D7A92D] opacity-0 peer-checked:opacity-100" />
                      </div>
                    </div>
                  </motion.div>
                </label>
              ))
            ) : (
              <div>
                <Stack spacing={1}>
                  <Skeleton
                    height="100%"
                    bg="green.500"
                    color="white"
                    fadeDuration={1}
                    borderRadius={12}
                  >
                    <div className="w-full h-32"></div>
                  </Skeleton>
                  <Skeleton
                    height="100%"
                    fadeDuration={4}
                    bg="blue.500"
                    color="white"
                    borderRadius={12}
                  >
                    <div className="w-full h-32"></div>
                  </Skeleton>
                  <Skeleton
                    height="100%"
                    fadeDuration={4}
                    bg="blue.500"
                    color="white"
                    borderRadius={12}
                  >
                    <div className="w-full h-32"></div>
                  </Skeleton>
                  <Skeleton
                    height="100%"
                    fadeDuration={4}
                    bg="blue.500"
                    color="white"
                    borderRadius={12}
                  >
                    <div className="w-full h-32"></div>
                  </Skeleton>
                  <Skeleton
                    height="100%"
                    fadeDuration={4}
                    bg="blue.500"
                    color="white"
                    borderRadius={12}
                  >
                    <div className="w-full h-32"></div>
                  </Skeleton>
                </Stack>
              </div>
            )}
            {servicesArr.length === 0 ? (
              <h1
                className={`${
                  active ? "text-white" : "text-transparent"
                } text-2xl`}
              >
                Нет услуг
              </h1>
            ) : (
              ""
            )}
          </div>
          <div
            className={`w-[95%] max-w-[580px] rounded-t-xl h-14 fixed  bottom-0   `}
          >
            <Link
              href={{
                pathname: "/time",
                query: {
                  filId: searchParams.get("filId"),
                  name: searchParams.get("name"),
                  address: searchParams.get("address"),
                  barberId: searchParams.get("barberId"),
                  barberName: searchParams.get("barberName"),
                  serviceArr: JSON.stringify(selectedService),
                  duration: duration
                },
              }}
              aria-disabled={selectedService.length === 0 ? true : false}
            >
              <button
                disabled={selectedService.length !== 0 ? false : true}
                className={`w-[100%] h-14  text-white text-xl font-normal flex justify-center items-center gap-4 rounded-t-xl ${
                  selectedService.length !== 0
                    ? "bg-[#D7A92D] text-white cursor-pointer"
                    : "bg-[#808080] text-[#a2a2a2] cursor-not-allowed"
                }`}
              >
                Далее к выбору времени{" "}
                <AiOutlineRight className="absolute right-2 w-5 h-full " />
              </button>
            </Link>
          </div>
        </div>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default Index;
