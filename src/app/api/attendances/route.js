import { NextResponse } from "next/server";
// import { sendingEmail, sendingEmailToClient } from "@/lib/mailServices";
import AttendanceClass from "@/models/attendances.models";

export const GET = async (request) => {
  try {
    const attendancesData = await AttendanceClass.getAllAttendances();
    return NextResponse.json(
      { message: "Presence Listee avec Success", attendancesData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};


export const POST = async (request) => {
  try {
    const { id, name } = await request.json();
    console.log(id, name)
    const dateNow = new Date();
    console.log("-------------", dateNow, id);

    const allUserAttendances = await AttendanceClass.getAttendanceByUserID(id);

    allUserAttendances.forEach((element) => {
        let month = dateNow.getMonth() + 1; //months from 1-12
        let day = dateNow.getDate();
        let year = dateNow.getFullYear();
        console.log("month-DAY-YEAR", month, day, year);
        console.log("SSSSS", element);
        // if (dateNow.getDay()) {
        // }
    });

    console.log("AAAAAAAAAA", allUserAttendances)

    // 1 - CREATE ATTENDANCE RECORD IN THE DATABASE
    const newAttendance = {
      date: dateNow,
      time: `${dateNow.getHours()} : ${dateNow.getMinutes()} : ${dateNow.getSeconds()}`,
      user_id: id, 
      name: name, 
    };
    console.log(newAttendance);
    const attendance = await AttendanceClass.addAttendances(newAttendance);
    // console.log(attendance);

    // return NextResponse.json(
    //   { message: "Reservation Created Successfully", attendance },
    //   { status: 201 }
    // );
    return NextResponse.json(
      { message: "Reservation Created Successfully", attendance: "HELLO" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
