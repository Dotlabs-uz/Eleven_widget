import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Skeleton, Stack, Avatar } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import Head from "next/head";
import { useToast } from "@chakra-ui/react";

function Index() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [barbersArr, setBarbersArr] = useState<any[]>([]);
  const [active, setActive] = useState(false);

  const filName = searchParams.get("name");
  const filAdress = searchParams.get("address");
  const toast = useToast();

  async function getServices() {
    try {
      const response = await axios.get(
        "https://starfish-app-f4ezq.ondigitalocean.app/barbers"
      );

      let bar = [];
      for (let i = 0; i < response.data.results.length; i++) {
        if (
          response.data.results[i].filial._id === id &&
          response.data.results[i].isOnline === true
        ) {
          bar.push(response.data.results[i]);
          setBarbersArr(bar);
        }
      }

      setActive(true);
    } catch (error) {
      console.error(error);
      toast({
        title: `Что-то пошло не так. Пожалуйста, попробуйте еще раз`,
        status: "error",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <ChakraProvider>
      <AnimatePresence>
        <div className="w-full ">
          <Head>
            <link
              rel="shortcut icon"
              href="/images/logoReal.svg"
              type="image/x-icon"
            />
            <title>eleven 11</title>
          </Head>
          <div className="w-full h-full max-w-[600px] mx-auto px-3  ">
            <div className=" flex items-center gap-2 w-full py-2 border-b-2 border-[#D7A92D] mb-3 ">
              <div className="w-8 h-9 flex items-center justify-center cursor-pointer ">
                <Link
                  href={{
                    pathname: "/filials",
                    query: {
                      name: searchParams.get("name"),
                      id: searchParams.get("id"),
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
            <h1 className="text-2xl font-medium text-white mb-3 ">
              Выбрать специалиста
            </h1>
            <div className="w-full">
              <div>
                {active ? (
                  barbersArr.map((item: any, index: number) => (
                    <Link
                      href={{
                        pathname: "/services",
                        query: {
                          filId: id,
                          name: searchParams.get("name"),
                          address: searchParams.get("address"),
                          barberId: item._id,
                          barberName: item.firstName,
                        },
                      }}
                      key={index}
                    >
                      <motion.div
                        initial={{ x: 0, y: 20, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3, type: "tween" }}
                        whileTap={{ scale: 0.5 }}
                        className="w-full h-full mt-3 mx-auto"
                        key={index}
                      >
                        <div className="w-full h-22 flex items-center rounded-2xl border-2 border-[#D7A92D]  mb-3   p-4 cursor-pointer  ">
                          <div className="w-full h-full flex gap-3 items-center ">
                            <div className=" h-full">
                              <Avatar
                                name={item.firstName}
                                src={item.avatar}
                                className="w-16 h-16 "
                              />
                            </div>
                            <div>
                              <span className="text-[#808080] text-base leading-3">
                                VIP-стилист
                              </span>
                              <h1 className="text-white text-2xl">
                                {item.firstName} {item.lastName}{" "}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
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
                    </Stack>
                  </div>
                )}

                {barbersArr.length === 0 ? (
                  <h1 className="text-white text-2xl ">Нет парикмахеров </h1>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default Index;
