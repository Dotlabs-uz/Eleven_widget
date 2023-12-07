import { motion } from "framer-motion";
import { LiaTelegramPlane } from "react-icons/lia";
import { BiLogoInstagram } from "react-icons/bi";
import { CiFacebook } from "react-icons/ci";
import Link from "next/link";
import Head from "next/head";

import { CgArrowLongRight } from "react-icons/cg";

import logo from "@/public/images/logoReal.png";
import bg from "@/public/images/new/_.png";

export default function Home() {
  return (
    <div className="w-full h-full max-w-[1400px]  mx-auto bg-white customBg ">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="eleven Barbershop in Samarkand - Your go-to destination for stylish haircuts and grooming services."
        />
        <meta
          name="keywords"
          content="eleven Barbershop, Samarkand, haircuts, grooming, barber services"
        />
        <meta name="author" content="Your Name or Barbershop Owner's Name" />

        <meta property="og:title" content="eleven Barbershop - Samarkand" />
        <meta
          property="og:description"
          content="Your go-to destination for stylish haircuts and grooming services in Samarkand."
        />
        <meta property="og:image" content="url_to_your_logo_image" />
        <meta property="og:url" content="url_to_your_website" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="eleven Barbershop - Samarkand" />
        <meta
          name="twitter:description"
          content="Your go-to destination for stylish haircuts and grooming services in Samarkand."
        />
        <meta name="twitter:image" content="url_to_your_logo_image" />

        <link
          rel="shortcut icon"
          href="/images/logoReal.svg"
          type="image/x-icon"
        />
        <title>eleven 11</title>
      </Head>
      <div className="w-full mx-auto flex h-20 justify-between items-center filialsBg px-7 sm:px-10 py-2 ">
        <div className="logo flex items-center gap-4 h-full ">
          <div className="h-full ">
            <img
              src={`${logo.src}`}
              alt=""
              className="w-[100%] h-full  object-contain mb-2  "
            />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-black flex justify-start items-center gap-2  ">
              eleven <span className="logoText">11</span>
            </h1>
            <h2 className="text-lg font-medium text-black ">БАРБЕРШОП</h2>
          </div>
        </div>
        <div className="hidden md:block">
          <ul className="flex  items-center gap-16 text-white text-xl uppercase ">
            <li className="navText">
              <a href="#academy">Academy</a>
            </li>
            <li className="navText">
              <a href="#gallery">GALLERY</a>
            </li>
          </ul>
        </div>
      </div>
      <header className=" w-full md:h-[450px] lg:h-[540px] flex flex-col-reverse md:flex-row justify-between px-10 z-20 relative mb-10 ">
        <div className=" w-full md:w-[60%] h-full flex flex-col items-start justify-start md:pt-12 lg:pt-16 xl:pt-20 gap-3 relative  ">
          <h1 className=" text-center  text-4xl xl:text-2xl text-white   z-20 relative flex flex-col items-center justify-center w-full sm:items-start sm:flex-row sm:justify-start gap-3 ">
            Барбершоп{" "}
            <span className="text-[#D7A92D] font-semibold ">
              eleven <span className="elevenNumber"> 11</span>
            </span>
          </h1>
          <h1 className=" hidden md:block md:text-3xl  lg:text-5xl  xl:text-7xl text-white uppercase font-bold  ">
            для настоящих мужчин
          </h1>
          <p className=" hidden md:block text-base lg:text-xl text-white  ">
            Барбершоп{" "}
            <span className="text-[#D7A92D] font-semibold  ">
              eleven <span className="elevenNumber"> 11</span>
            </span>
            - это место, где каждый мужчина <br />
            найдет ту самую стрижку и того самого мастера
          </p>
          <Link href={"/filials"} className="w-full">
            <button className="flex items-center justify-center gap-7 border border-[#D7A92D] w-full md:w-72 h-11 bg-[#D7A92D] rounded-xl text-xl ">
              Записатся <CgArrowLongRight />
            </button>
          </Link>
        </div>
        <div className="w-full md:w-[40%] h-full  ">
          <img src={`${bg.src}`} alt="" className="w-full h-full " />
        </div>
      </header>
      <div
        className="w-full  px-4 py-3  max-w-[1000px] mx-auto border-b-2 border-white mb-5 pb-10 anotherBg "
        id="academy"
      >
        <h1 className="text-4xl font-medium mb-6  text-white text-center ">
          ACADEMY
        </h1>
        <div className="block sm:flex  w-full  gap-3 ">
          <motion.div
            initial={{ x: 0, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="w-full sm:w-2/4  rounded-xl mb-4 sm:mb-0"
          >
            <img
              src="https://i0.wp.com/southseattleemerald.com/wp-content/uploads/2022/01/2020_09.24_Shutterstock_1820689556_VintageBarberChair_BodyStock.jpg?fit=1200%2C782&ssl=1"
              alt=""
              width={100}
              className="w-full  object-cover "
            />
          </motion.div>
          <motion.div
            initial={{ x: 0, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="w-full sm:w-2/4 md:h-[240px]  lg:h-[310px] px-4 py-6 text-justify  max-w-[1000px] mx-auto   flex flex-col justify-between filialsBg "
          >
            <p className="text-white text-lg mb-3 ">
              Будьте собой, ваш стиль значит больше, лучшие стилисты в миг
              сделают ваш образ, красочнее, выделяйтесь и будьте на стиле!
            </p>
            <a
              href="tel:+998954121111"
              className=" w-full h-12 text-center leading-[48px] rounded-xl bg-[#D7A92D] font-medium  "
            >
              Проконсультироваться
            </a>
          </motion.div>
        </div>
      </div>
      <div
        className="max-w-[1000px] mx-auto  relative z-20  px-4 anotherBg   mb-5 pb-10"
        id="gallery"
      >
        <h1 className="text-4xl font-medium mb-6  text-white text-center ">
          GALLERY
        </h1>
        <div className="grid grid-cols-2 gap-2  md:grid-cols-3 md:gap-4 h-full  ">
          <div className=" col-span-2 row-span-2  p-2 md:p-3   filialsBg  ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
              className="object-contain"
            />
          </div>
          <div className="filialsBg p-2 md:p-3 ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="filialsBg p-2 md:p-3 ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="filialsBg p-2 md:p-3 ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="filialsBg p-2 md:p-3 ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="filialsBg p-2 md:p-3  hidden md:block ">
            <img
              src="https://dengodel.com/wp-content/uploads/2021/01/barbershop-chto-eto-1.jpg"
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <h1 className="text-white text-3xl mb-3 px-4">
        eleven <span className="elevenNumber">11</span>
      </h1>
      <footer className="w-full max-w-[1000px] mx-auto pb-3 border-t-2 pt-3 border-white ">
        <div className="w-full">
          <div className="w-full mb-2 block sm:flex items-center justify-between border-b-2 border-white ">
            <div className="w-full h-full leading-5 mb-2 px-4 pb-2 border-b-2 border-white sm:border-none ">
              <span className="text-sm text-[#D7A92D] font-bold leading-5">
                ТЦ Atlas
              </span>
              <h2 className="text-lg text text-[#BBB]">
                Cамарканд, Ул. Буюк Ипак Йули, 131B
              </h2>
              <a href="tel:+998954121111" className="text-lg text text-[#BBB]">
                +998 (95) 412-11-11
              </a>
              <div>
                <h1 className="text-[#BBB]">График работы</h1>
                <div>
                  <span className="text-[#BBB]">Пн-Вс </span>
                  <span className="text-[#BBB]">10:00 - 22:00</span>
                </div>
              </div>
            </div>
            <div className="w-full h-full leading-5 text-right px-4 mb-3">
              <span className="text-sm text-[#D7A92D] font-bold ">
                ТРЦ Family Park
              </span>

              <h2 className="text-lg text text-[#BBB]">
                Cамарканд, Ул. Нарпайская, 76
              </h2>
              <a href="tel:+998945401111" className="text-lg text text-[#BBB]">
                +998 (94) 540-11-11
              </a>
              <div>
                <h1 className="text-[#BBB]">График работы</h1>
                <div>
                  <span className="text-[#BBB]">Пн-Вс </span>
                  <span className="text-[#BBB]">10:00 - 23:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-end items-center px-4 ">
            <div className="flex w-full h-full justify-between items-center ">
              <h1 className="text-[#BBB]">Cоциальные сети</h1>
              <div className="w-[30%] h-full flex justify-end items-center gap-3 ">
                <a href="#" target="_blank">
                  <LiaTelegramPlane className="text-[#BBB] text-2xl cursor-pointer transition-all duration-500 hover:text-[#FF9800] hover:scale-110 " />
                </a>
                <a href="https://www.instagram.com/eleven.uz/" target="_blank">
                  <BiLogoInstagram className="text-[#BBB] text-2xl cursor-pointer transition-all duration-500 hover:text-[#FF9800] hover:scale-110" />
                </a>
                <a href="#" target="_blank">
                  <CiFacebook className="text-[#BBB] text-2xl cursor-pointer transition-all duration-500 hover:text-[#FF9800] hover:scale-110 " />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
