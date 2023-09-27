"use client";

import { useEffect, useState } from 'react';

import { faSearch, faFile, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast"; 
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter(); 

  const [ showSuggestion, setShowSuggestion ] = useState (false);
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
        user.from_institute.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.field_study.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setShowResult(filteredAttendances);
  };
  console.log(showResult);
  const [ showConfirm, setShowConfirm ] = useState (false)
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
          router.refresh();
          router.push("/amazing_congratulation");
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
  }

  const [ options, setOptions ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
  return (
    <main className="HommePageContainer">
      <div className="Content">
        <div className="MainTitleDiv">
          <h1>DATA DRIVEN SOLUTION</h1>
        </div>
        <div className="MainTitleDiv">
          <h1>Day 1</h1>
        </div>
        <div className="DateDiv">
          <h1>{new Date().toLocaleDateString("fr-FR", options)}</h1>
        </div>
        <div className="TitleDiv">
          <h1>Inscrivez votre Présent en tappant votre nom ci-dessous</h1>
        </div>

        <div className="sectionContent">
          <div className="SearchSuggestionsDiv">
            <FontAwesomeIcon icon={faSearch} size="2xl" color="black" />
            <input
              placeholder="ecrivez votre nom"
              type="text"
              className="SearchNames"
              onChange={handleFilterName}
              onFocus={() => setShowSuggestion(true)}
              // onBlur={() => setShowSuggestion(false)}
            />
          </div>

          <div className="extraInstruction">
            <p>Cliquez sur le boutton &quot;Présent&quot; a droite de votre Nom</p>
          </div>

          {showSuggestion ? (
            <div className="ShowSuggestions">
              {showResult.length > 0
                ? showResult.map((element, index) => {
                    return (
                      <div className="suggestionItem" key={element.id}>
                        <div className="left">
                          <FontAwesomeIcon
                            icon={faUser}
                            size="2xl"
                            color="black"
                          />
                          <div className="suggestionContent">
                            {element.name}
                          </div>
                        </div>

                        <div className="right">
                          {/* <FontAwesomeIcon icon={faSearch} size={20} color="blue" /> */}
                          <button
                            disabled={disableButton ? true : false}
                            className="validatingButton"
                            onClick={(event) => {
                              event.preventDefault();
                              handleShowConfirm(element.id, element.name);
                            }}
                          >
                            {disableButton ? "en cour" : "Présent"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          ) : (
            ""
          )}

          <div className="ShowSuggestionsFooter">
            <div className="PoweredByKaeyrosAnalytics">
              Powered By Kaeyros-Analytics
            </div>
          </div>
        </div>

        <div className="partenersLogo">
          <img src="./bgrd/main_bg3.jpeg" />
        </div>

        {/* <div className="ButtonDiv">
          <button className="Present">Present</button>
        </div> */}
      </div>

      {/* <div className="sectionContent">
        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>

        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>

        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>

        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>

        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>
        <div className="peopleAttendanceCheck">
          <div className="genderClass">
            
            <p>Mr</p>
          </div>
          <div className="PersonsName">Eric Mbala</div>
          <div className="ButtonDiv">
            <button className="Present">Present</button>
          </div>
        </div>
      </div> */}
    </main>
  );
}
