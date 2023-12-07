import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import logo from "@/public/images/logoReal.png";
import { GoLocation } from "react-icons/go";
import Head from "next/head";
import { useToast } from "@chakra-ui/react";

function Index() {
  const [filialsArr, setFilialsArr] = useState<any[]>([]);
  const toast = useToast();
  async function getFilials() {
    try {
      const response = await axios.get(
        "https://starfish-app-f4ezq.ondigitalocean.app/filials?page=1"
      );
      setFilialsArr(response.data.results);
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
    getFilials();
  }, []);

  const searchParams = useSearchParams();

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="w-full  max-w-[600px] mx-auto overflow-hidden   duration-500 transition ">
      <Head>
        <link
          rel="shortcut icon"
          href="/images/logoReal.svg"
          type="image/x-icon"
        />
        <title>eleven 11</title>
      </Head>
      <div className="relative  h-[60%]  w-full  bg-[#101010]   pt-10 px-8 py-2 transition-all duration-500 ">
        <div className="w-full h-[530px]">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="show"
            className="max-w-[480px] h-full bgFil  gap-4 rounded-2xl  mx-auto overflow-hidden z-10 relative p-4 "
          >
            <Link href={"/"} className="text-2xl">
              <BiArrowBack />
            </Link>

            <img
              src={`${logo.src}`}
              alt=""
              className="w-[100%] h-[120px] object-contain mb-2 "
            />
            <p className="text-lg text-black mb-2 ">11 - выше ваших ожиданий</p>
            {filialsArr.map((item: any, index: number) => (
              <motion.div
                initial={{ x: 0, y: 400, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: "tween" }}
                className=" w-full sm:w-[420px] flex justify-between items-center  mx-auto h-36  mb-4 rounded-xl bgFilialOne relative  px-4 py-2  "
                key={index}
              >
                <div className="w-full h-3/4 flex flex-col justify-between items-start ">
                  <h1 className="text-2xl text-white font-medium z-10 relative flex items-center gap-1  mb-3">
                    <GoLocation className="text-lg" /> {item.name}
                  </h1>
                  <div className="w-full flex items-center gap-5">
                    <Link
                      href={{
                        pathname: "/barbers",
                        query: {
                          name: item.name,
                          id: item._id,
                          address: item.address,
                        },
                      }}
                    >
                      <button className="w-52 rounded-full bg-[#FF9800] h-10 border-2 border-[#FF9800] relative z-20 customBtn ">
                        ЗАПИСЬ
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Index;
