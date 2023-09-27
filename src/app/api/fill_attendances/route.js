// import connectMongoDB from "@/lib/mongodb";
// import User from "@/models/userModel";
import { NextResponse } from "next/server";

// import bcryptjs from "bcryptjs";
import UserClass from "@/models/users.model";


// import { NextResponse } from "next/server";

export const GET = async (request) => {
  console.log("IT CAME HERE.......");
  try {
    const reservationsData = await UserClass.getAllUsers();
    // let finalData = [];
    return NextResponse.json(
      { message: "Reservations Listed Successfully", reservationsData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}; 

// export const POST = async (request) => {
//   try {
//     const { newEmail, newPassword } = await request.json();
//     console.log(newEmail, newPassword);
//     const existingUser = await AttendanceClass.getUserByEmail(newEmail);
//     // console.log("-----------", existingUser);

//     if (!newEmail && !newPassword) {
//       return NextResponse.json(
//         { message: "Tout les champs doivent etre remplis" },
//         { status: 400 }
//       );
//     }

//     if (existingUser.length > 0) {
//       console.log("Hello");
//       return NextResponse.json(
//         { message: "Utilisateur deja existant", existingUser },
//         { status: 409 }
//       );
//     }

//     // Creating a salt
//     const salt = await bcryptjs.genSalt(15);
//     console.log("SALT: ", salt);
//     // Salting the password
//     const hashedPassword = await bcryptjs.hash(newPassword, salt);

//     // console.log("HASHED PW: ", hashedPassword);

//     const newUser = {
//       email: newEmail,
//       password: hashedPassword,
//     };
//     console.log(newUser);
//     const savedUser = await AttendanceClass.addAttendances(newUser);

//     return NextResponse.json(
//       { message: "Utilisateur cree avec success", savedUser },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: "Error", error }, { status: 500 });
//   }
// };
