import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


function Nav() {

  const params = useSearchParams()
  const filName = params.get('name')
  const filAdress = params.get('address')

  return (
    <div className=" flex items-center gap-2 w-full py-2 border-b-2 border-[#D7A92D] mb-3 ">
      <div className="w-8 h-9 flex items-center justify-center cursor-pointer ">
        <Link href={"/"}>
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
  );
}

export default Nav;
