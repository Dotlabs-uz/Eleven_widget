import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import {
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Link from "next/link";
import InputMask from "react-input-mask";
import Head from "next/head";

function Order() {
  const seartchParams = useSearchParams();
  const filId = seartchParams.get("filId");
  const filName = seartchParams.get("name");
  const filAddress = seartchParams.get("address");
  const barberId = seartchParams.get("barberId");
  const barberName = seartchParams.get("barberName");
  const time: any = seartchParams.get("time");
  const day: any = seartchParams.get("day");
  const serviceArr: any = seartchParams.get("serviceArr");

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState<any>("");
  const [userPhone, setUserPhone] = useState<any>("");
  const [userDes, setUserDes] = useState<any>("");
  const [active, setActive] = useState(true);
  const [animationOrder, setAnimationOrder] = useState(false);

  const t = JSON.parse(time || "{}");
  const services = JSON.parse(serviceArr || "[]");

  const toast = useToast();

  let totalPrice = 0;

  function total() {
    for (let i = 0; i < services.length; i++) {
      totalPrice += services[i].price;
    }
  }
  total();

  async function postUser() {
    setAnimationOrder(true);
    try {
      await axios
        .post("https://starfish-app-f4ezq.ondigitalocean.app/orders", {
          barber: barberId,
          services: JSON.parse(serviceArr),
          orderStart: moment(t.formatTime).toISOString(),
          client: {
            name: userName,
            phone: `+${userPhone.replace(/\D/g, "")}`,
            // description: userDes
          },
          payments: "cash",
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            setAnimationOrder(false);
            onOpen();
          } else {
            setAnimationOrder(false);
            toast({
              title: `что-то пошло не так`,
              status: "error",
              isClosable: true,
            });
          }

          setUserName("");
          setUserPhone("");
          setUserDes("")
        });
    } catch (error) {
      console.error(error);
      toast({
        title: `Что-то пошло не так. Пожалуйста, попробуйте еще раз`,
        status: "error",
        isClosable: true,
      });
    }
  }

  const sentUser = (e: any) => {
    e.preventDefault();
    postUser();
  };

  const size = useWindowSize();

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<any>({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  return (
    <ChakraProvider>
      <div className="flex flex-col h-full max-w-[600px]  mx-auto  justify-center items-center   bg-[#101010] pb-4   ">
        <Head>
          <link
            rel="shortcut icon"
            href="/images/logoReal.svg"
            type="image/x-icon"
          />
          <title>eleven 11</title>
        </Head>
        <Nav />
        <div className="w-full h-full px-3">
          <div className="w-full h-full border-2 border-[#D7A92D] p-3 rounded-xl mb-3  ">
            <form onSubmit={sentUser}>
              <FormLabel className="text-white">Введите свои данные</FormLabel>
              <Input
                type="text"
                placeholder="напишите свое имя"
                size={"md"}
                outline="none"
                value={userName}
                border={"1px solid #D7A92D"}
                className="outline-none text-white border-[#D7A92D] mb-3 rounded-lg  "
                onChange={(e: any) => setUserName(e.target.value)}
                name="text"
                required
                focusBorderColor="#fff"
              />
              <InputMask
                className="w-full mb-3 py-[16px] max-2xl:py-1 px-6 max-2xl:px-4  max-xl:py-[8px] max-xl:px-3 border text-white  border-[#D7A92D] rounded-md bg-[#101010] focus:border-[#D7A92D] "
                mask="+\9\98 (99) 999-99-99"
                name="phone"
                placeholder="Напишите свой телефон"
                required
                value={userPhone}
                onChange={(e: any) => setUserPhone(e.target.value)}
              ></InputMask>
              <Textarea
                placeholder="Комментарий"
                border={"1px solid #D7A92D"}
                outline={"none"}
                className="mb-3 text-white "
                onChange={(e: any) => setUserDes(e.target.value)}
                focusBorderColor="#fff"
              />
              <button
                type="submit"
                color={"white"}
                className={`w-full text-white text-xl h-12 rounded-md btn  ${
                  userName.length === 0 && userPhone.length === 0
                    ? "bg-gray-400 cursor-not-allowed "
                    : "bg-[#D7A92D]  cursor-pointer"
                } `}
                disabled={
                  userName.length === 0 && userPhone.length === 0 ? true : false
                }
              >
                отправить данные
              </button>
            </form>
          </div>
          <div className="w-full h-full border-2 border-[#D7A92D] p-3 rounded-xl  ">
            <div className="w-full h-full border-b-2 border-[#D7A92D] pb-3 ">
              <h1 className="text-white text-2xl font-medium ">
                БАРБЕРШОП eleven 11
              </h1>
              <h2 className="text-[#808080] text-lg flex items-center gap-2 ">
                {filName}{" "}
                <span className="flex items-center ">
                  <FaLocationDot className="text-xs" /> {filAddress}
                </span>
              </h2>
              <h2 className="text-[#808080]">пн.-вс.: 10:00-21:00</h2>
            </div>
            <div className="w-full h-full">
              <h2 className="text-white mt-3">
                {moment(JSON.parse(day)).format("LL")} {t.time}
              </h2>
              <div className="w-full h-full border-b-2 border-[#D7A92D] py-3  ">
                {services.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="w-full h-full border-2 border-[#D7A92D] rounded-md p-3 mb-3 flex items-center justify-between  "
                  >
                    <div>
                      <h1 className="text-white">
                        {item.name} у {barberName}{" "}
                      </h1>
                      <h1 className="text-white">
                        {item.duration} <span className="text-sm">мин.</span>{" "}
                      </h1>
                    </div>
                    <div className="w-12 h-12 ">
                      <img
                        src="https://i.imgur.com/LrwRUnn.png"
                        alt="img"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 ">
              <h2 className="text-white text-xl">Итого</h2>
              <h2 className="text-white text-xl ">
                {" "}
                {new Intl.NumberFormat("en-DE").format(totalPrice)} сум.{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {animationOrder ? (
        <div className="w-full h-full fixed z-40 top-0 left-0    bg-[#000000b4]  flex items-center justify-center text-white ">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#FE9800"
            size="xl"
          />
        </div>
      ) : (
        ""
      )}
      <Drawer
        placement={size.width > 600 ? "right" : "bottom"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent className="bg-[#101010] -z-10 relative h-44 ">
          <DrawerHeader
            borderBottomWidth="2px  "
            borderBottomColor={"#FE9800"}
            className="bg-[#101010] text-white"
          >
            БАРБЕРШОП eleven 11
          </DrawerHeader>
          <DrawerBody className=" bg-[#101010] text-white  ">
            <div className="w-full  text-left ">
              <h1 className="mb-5">Ваш заказ успешно зарегистрирован</h1>
              <Link href={"/"}>
                <Button
                  variant="conteined"
                  className="border border-[#D7A92D] bg-[#D7A92D] w-full"
                  disabled={active}
                >
                  перейти на главную страницу
                </Button>
              </Link>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
}

export default Order;
