"use client";

import { useEffect, useState } from "react";

import { faSearch, faFile, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showResult, setShowResult] = useState([]);

  const getAllUsers = async () => {
    const res = await fetch(`/api/fill_attendances`, {
      cache: "no-store",
    })
      .then((respons) => respons.json())
      .then((data) => data);

    setShowUsers(res);
  };

  console.log(showUsers);

  useEffect(() => {
    // getUserDetails();
    getAllUsers();
  }, []);

  // const showNameSuggestions = () => {
  //   setShowSuggestion (true)
  // };

  const handleFilterName = (e) => {
    let final_value = showUsers.reservationsData;
    let filteredAttendances = final_value?.filter((user, id) => {
      console.log(user);
      if (e.target.value === "") return showUsers?.reservationsData;
      return (
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.contact.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.from_institute
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        user.field_study.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setShowResult(filteredAttendances);
  };
  console.log(showResult);
  const [showConfirm, setShowConfirm] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleShowConfirm = async (id, name) => {
    // const handleSubmit = async (event) => {

    // toast.promise(saveSettings(settings), {
    //   loading: "Saving...",
    //   success: <b>Settings saved!</b>,
    //   error: <b>Could not save.</b>,
    // });

    try {
      const usersData = await fetch("/api/attendances", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // window.localStorage.setItem("userToken", data.data.token);
          // window.localStorage.setItem("email", data.data.email);
          // window.localStorage.setItem("id", data.data.id);
          // dispatch({ type: "LOGGED_IN_USER", isLoggedIn: true });
          return data;
        });

      console.log("EEEEEEEEEE: ", usersData);

      if (usersData) {
        // dispatch({ type: "LOGGED_IN_USER", isLoggedIn: true });
        // window.localStorage.setItem('userToken', res.data.token)
        // window.localStorage.setItem('user', res.data.user)
        toast.success(`Ajout de présence éffectuée avec succes`);

        setShowResult([]);
        // router.refresh();
        // router.push("/admin/office/dashboard");
      } else if (usersData.status === 409) {
        toast.error(`Votre présence a déja été signalée aujourd'hui. `);
      } else {
        throw new Error("Echec Ajout de présence de l'utilisateur. ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisableButton(false);
    }
    // };
  };

  const [options, setOptions] = useState({
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return (
    <main className="HommePageContainer">
      <div className="Content">
        <div className="ThankYou">
          {/* <h1>MERCI POUR VOTRE PARTICIPATION</h1> */}
          <h1>Merci Pour Votre Participation</h1>
        </div>
        <div className="partenersLogo">
          <img src="./bgrd/rename.png" />
        </div>
      </div>
    </main>
  );
}
