import { useMemo, useState } from "react";
import { cn, dayNames } from "@/lib/utils";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isBefore,
	isEqual,
	isSameMonth,
	isThisMonth,
	isToday,
	parse,
	startOfToday,
	startOfWeek,
} from "date-fns";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@chakra-ui/react";

import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { ChakraProvider } from "@chakra-ui/react";

import { Spinner } from "@chakra-ui/react";
import Head from "next/head";

function findFreeTimeSlots(
	busyTimes: any,
	taskDurationInMinutes: any,
	workDayStart: any,
	workDayEnd: any
) {
	const busySlots = busyTimes.map((time: any) => [
		new Date(time.from).getTime(),
		new Date(time.to).getTime(),
	]);

	const workDayStartTime = new Date(workDayStart).getTime();
	const workDayEndTime = new Date(workDayEnd).getTime();

	const slots = [];

	let currentTime = workDayStartTime;

	while (currentTime + taskDurationInMinutes * 60 * 1000 <= workDayEndTime) {
		const slotEndTime = currentTime + taskDurationInMinutes * 60 * 1000;

		// Проверяем, пересекается ли интервал с уже занятыми временами
		const isOverlap = busySlots.some(
			([busyFrom, busyTo]: any) =>
				(currentTime >= busyFrom && currentTime < busyTo) ||
				(slotEndTime > busyFrom && slotEndTime <= busyTo) ||
				(currentTime <= busyFrom && slotEndTime >= busyTo)
		);

		// Если интервал не пересекается с занятыми временами, добавляем его в результат
		if (!isOverlap) {
			slots.push([
				new Date(currentTime).toISOString(),
				new Date(slotEndTime).toISOString(),
			]);
		}

		currentTime += 30 * 60 * 1000; // Увеличиваем текущее время на 30 минут
	}

	return slots;
}

function Index() {
	let today = startOfToday();
	const searchParams = useSearchParams();

	const [selectedTime, setSelectedTime] = useState<any>();
	const [selectDay, setSelectDay] = useState<any>(today);
	const [active, setActive] = useState<any>(false);
	const [notWorking, setNotWorking] = useState<any>(false);

	const [morning, setMorning] = useState<any>([]);
	const [afternoon, setAfternoon] = useState<any>([]);
	const [evening, setEvemimg] = useState<any>([]);
	const toast = useToast();
	const duration: any = searchParams.get("duration");

	async function getFreeTime() {
		try {
			const response = await axios.post(
				"https://starfish-app-f4ezq.ondigitalocean.app/get-free-time",
				{
					date: moment(selectDay).add(10, "hours").toISOString(),
					_id: searchParams.get("barberId"),
				}
			);

			if (response.status === 200 || response.status === 201) {
				const busyTimes = response.data.notWorking;
				
				let workDayStart = moment(selectDay)
					.startOf("day")
					.add(13, "hours")
					.toISOString();
				const workDayEnd = moment(selectDay)
					.startOf("day")
					.add(27, "hours")
					.toISOString();
				
				if (
					moment(today).format("L") === moment(selectDay).format("L")
				) {
					workDayStart = moment().add(5, "hours").toISOString();
				}

				const freeTimeSlots: any = findFreeTimeSlots(
					busyTimes,
					duration,
					workDayStart,
					workDayEnd
				);

        setMorning([])
        setAfternoon([])
        setEvemimg([])
				if (freeTimeSlots.length > 0) {
					setNotWorking(false);

					let arrMoning = [];
					let arrAfternoon = [];
					let arrEvening = [];

					for (let i = 0; i < freeTimeSlots.length; i++) {
						let time = moment(freeTimeSlots[i][0])
							.subtract(5, "hours")
							.format("HH:mm");

						if (parseInt(time) < 12) {
							arrMoning.push({
								time: time,
								formatTime: freeTimeSlots[i][0],
							});
							setMorning(arrMoning);
						} else if (parseInt(time) < 18) {
							arrAfternoon.push({
								time: time,
								formatTime: freeTimeSlots[i][0],
							});
							setAfternoon(arrAfternoon);
						} else if (parseInt(time) == 0) {
							continue;
						} else {
							arrEvening.push({
								time: time,
								formatTime: freeTimeSlots[i][0],
							});
							setEvemimg(arrEvening);
						}
					}
				} else {
					setNotWorking(true);
				}

				setActive(true);
			} else {
				setNotWorking(true);
				setActive(false);
			}
		} catch (error) {
			toast({
				title: `Что-то пошло не так. Пожалуйста, попробуйте еще раз`,
				status: "error",
				isClosable: true,
			});
			setNotWorking(true);
			setActive(false);
		}
	}

	useEffect(() => {
		getFreeTime();
	}, [selectDay]);

	// handle dates
	let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
	let [selectedDay, setSelectedDay] = useState(today);
	let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
	let days = useMemo(
		() =>
			eachDayOfInterval({
				start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
				end: endOfWeek(endOfMonth(firstDayCurrentMonth), {
					weekStartsOn: 1,
				}),
			}),
		[firstDayCurrentMonth]
	);

	// next and prev month functions
	function prevMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}
	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	const chooseDay = (day: Date) => {
		setSelectedDay(day);
		let time = moment(day).format();
		setSelectDay(time);
	};

	const filName = searchParams.get("name");
	const filAdress = searchParams.get("address");

	const clickDay = (day: any) => {
		chooseDay(day);
		setActive(false);
	};

	return (
		<ChakraProvider>
			<div className="flex flex-col h-full max-w-[600px]  mx-auto  justify-center items-center  bg-[#101010]">
				<Head>
					<link
						rel="shortcut icon"
						href="/images/logoReal.svg"
						type="image/x-icon"
					/>
					<title>eleven 11</title>
				</Head>
				<div className=" flex items-center gap-2 w-full pl-4 py-2 border-b-2 border-[#D7A92D]  ">
					<div className="w-8 h-9 flex items-center justify-center cursor-pointer ">
						<Link
							href={{
								pathname: "/services",
								query: {
									filId: searchParams.get("filId"),
									name: searchParams.get("name"),
									address: searchParams.get("address"),
									barberId: searchParams.get("barberId"),
									barberName: searchParams.get("barberName"),
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

				{/* calendar implementation */}
				<div className="flex flex-col gap-2 h-[450px] w-[90%] p-4 mt-4 border border-[#D7A92D]  rounded-xl ">
					{/* calendar header */}
					<div className="grid grid-cols-3">
						<button
							type="button"
							onClick={prevMonth}
							disabled={isThisMonth(new Date(currentMonth))}
						>
							<ChevronLeft
								size={30}
								aria-hidden="true"
								className={cn(
									(isThisMonth(new Date(currentMonth)) &&
										"text-black") ||
										"text-[#D7A92D]"
								)}
							/>
						</button>
						<h2 className="font-semibold text-[15px] sm:text-base text-white justify-center flex">
							{format(firstDayCurrentMonth, " MMMM yyyy")}
						</h2>
						<button
							type="button"
							className="flex justify-end"
							onClick={nextMonth}
						>
							<ChevronRight
								size={30}
								aria-hidden="true"
								className="text-[#D7A92D]"
							/>
						</button>
					</div>

					{/* calendar body */}
					<div>
						<div className="grid grid-cols-7 mt-4">
							{dayNames.map((day, i) => {
								return (
									<div
										key={i}
										className={cn(
											"flex justify-center  items-center text-lg text-white w-full py-2",
											{
												"text-orange-400  bg-[[#101010]]  ":
													day === "Sun",
											}
										)}
									>
										{day}
									</div>
								);
							})}
						</div>

						<div className="grid grid-cols-7 text-sm gap-1 ">
							{days.map((day, dayIdx) => {
								return (
									<div
										key={day.toString()}
										className={cn(
											dayIdx === 0 &&
												colStartClasses[
													getDay(day) - 1
												],
											" justify-center flex items-center mb-0 md:mb-2",
											getDay(day) === 0 ||
												getDay(day) === 6
										)}
									>
										<button
											onClick={() => clickDay(day)}
											className={cn(
												"w-14 h-12  flex flex-col  justify-center items-center rounded-xl gap-0 group bg-[#101010] relative  group border border-[#D7A92D] ",
												isEqual(day, selectedDay) &&
													"bg-[#D7A92D] text-white text-xl",
												isEqual(today, day) &&
													"text-blue-500",
												isBefore(day, today) &&
													"text-white bg-[#101010] cursor-not-allowed",
												isEqual(today, day) &&
													"text-white bg-[#101010]",
												isBefore(day, today) &&
													"cursor-not-allowed",
												isEqual(day, selectedDay) &&
													isToday(day) &&
													"bg-[#D7A92D]",
												!isEqual(day, selectedDay) &&
													!isToday(day) &&
													!isSameMonth(
														day,
														firstDayCurrentMonth
													) &&
													"text-gray-400",
												!isEqual(day, selectedDay) &&
													!isToday(day) &&
													isSameMonth(
														day,
														firstDayCurrentMonth
													) &&
													"text-white text-lg "
											)}
											disabled={isBefore(day, today)}
										>
											<time
												dateTime={format(
													day,
													"yyyy-MM-dd"
												)}
												className={cn(
													"group-hover:text-lg",
													(isEqual(
														day,
														selectedDay
													) ||
														isToday(day)) &&
														"font-semibold"
												)}
											>
												{format(day, "d")}
											</time>

											<CheckCircle2
												className={cn(
													"hidden",
													isEqual(day, selectedDay) &&
														"absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-white",
													isEqual(day, today) &&
														"text-white"
												)}
											/>
										</button>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="w-full h-full  ">
					<div className="w-[90%] mx-auto mt-5 px-6 py-6 h-full flex flex-col justify-start gap-3 border border-[#D7A92D] rounded-xl mb-5 ">
						{active ? (
							<div className="flex flex-col pb-6">
								<div
									className={`w-full h-full flex flex-wrap justify-start gap-1 sm:gap-3 ${
										morning.length === 0
											? "border-none pb-0 "
											: "border-b-2 border-[#D7A92D] pb-3"
									}    `}
								>
									{morning.map((item: any, index: number) => (
										<div
											key={index}
											className={`${
												selectedTime == item
													? " w-[32%] sm:w-[23%] h-10 rounded-lg flex  text-white text-xl border border-[#D7A92D] cursor-pointer bg-[#D7A92D] "
													: "w-[32%] sm:w-[23%] h-10 rounded-lg flex  text-white text-xl border border-[#D7A92D] cursor-pointer"
											}
                 `}
										>
											<button
												onClick={() => {
													setSelectedTime(item);
												}}
												className="relative w-full h-full   "
											>
												{item.time}
												<CheckCircle2
													className={`${
														selectedTime == item
															? "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-white"
															: "hidden"
													}`}
												/>
											</button>
										</div>
									))}
								</div>
								<div
									className={`w-full flex flex-wrap justify-start gap-1 sm:gap-3 ${
										afternoon.length === 0
											? "border-none py-0"
											: "border-b-2 border-[#D7A92D] py-3"
									}  `}
								>
									{afternoon.map(
										(item: any, index: number) => (
											<div
												key={index}
												className={`${
													selectedTime == item
														? "w-[32%] sm:w-[23%] h-10 rounded-lg flex justify-center items-center text-white text-xl border border-[#D7A92D] cursor-pointer bg-[#D7A92D] "
														: "w-[32%] sm:w-[23%] h-10 rounded-lg flex justify-center items-center text-white text-xl border border-[#D7A92D] cursor-pointer"
												}
                     `}
											>
												<button
													onClick={() => {
														setSelectedTime(item);
													}}
													className="relative w-full h-full "
												>
													{item.time}
													<CheckCircle2
														className={`${
															selectedTime == item
																? "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-white"
																: "hidden"
														}`}
													/>
												</button>
											</div>
										)
									)}
								</div>
								<div
									className={`w-full flex flex-wrap justify-start gap-1 sm:gap-3 pt-3`}
								>
									{evening.map((item: any, index: number) => (
										<div
											key={index}
											className={`${
												selectedTime == item
													? "w-[32%] sm:w-[23%] h-10 rounded-lg flex justify-center items-center text-white text-xl border border-[#D7A92D] cursor-pointer bg-[#D7A92D] "
													: "w-[32%] sm:w-[23%] h-10 rounded-lg flex justify-center items-center text-white text-xl border border-[#D7A92D] cursor-pointer"
											}
                     `}
										>
											<button
												onClick={() => {
													setSelectedTime(item);
												}}
												className="relative w-full h-full "
											>
												{item.time}
												<CheckCircle2
													className={`${
														selectedTime == item
															? "absolute block top-0 right-0 h-[18px] w-[18px] translate-x-1 -translate-y-1 text-white"
															: "hidden"
													}`}
												/>
											</button>
										</div>
									))}
								</div>
								{notWorking ? (
									<p
										className={` ${
											active
												? "text-white"
												: "text-transparent"
										}  uppercase text-xl `}
									>
										этот парикмахер сегодня не работает
									</p>
								) : (
									""
								)}
							</div>
						) : (
							<div className="w-full h-20 flex justify-center items-center ">
								<Spinner
									thickness="2px"
									speed="0.65s"
									emptyColor="gray.200"
									color="#FE9800"
									size="xl"
								/>
							</div>
						)}
					</div>
					<div className="w-[90%] mx-auto h-full relative">
						<Link
							href={{
								pathname: "/order",
								query: {
									filId: searchParams.get("filId"),
									name: searchParams.get("name"),
									address: searchParams.get("address"),
									barberId: searchParams.get("barberId"),
									barberName: searchParams.get("barberName"),
									day: JSON.stringify(selectDay),
									time: JSON.stringify(selectedTime),
									serviceArr: searchParams.get("serviceArr"),
								},
							}}
						>
							<button
								disabled={
									selectedTime && selectedDay ? false : true
								}
								className={`w-[100%] max-w-[550px] h-14  rounded-t-xl  text-white text-xl fixed bottom-0 left-0  sm:relative ${
									selectedTime && selectedDay
										? "bg-[#D7A92D] cursor-pointer "
										: "bg-gray-400 cursor-not-allowed "
								}`}
							>
								Далее Введите свои данные
							</button>
						</Link>
					</div>
				</div>
			</div>
		</ChakraProvider>
	);
}

let colStartClasses = [
	"",
	"col-start-2",
	"col-start-3",
	"col-start-4",
	"col-start-5",
	"col-start-6",
	"col-start-7",
];

export default Index;
