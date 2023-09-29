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

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleFilterName = (e) => {
    let final_value = showUsers.reservationsData;
    let filteredAttendances = final_value?.filter((user, id) => {
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

  // console.log(showResult);
  const [ showConfirm, setShowConfirm ] = useState (false)
  const [disableButton, setDisableButton] = useState(false);

  const handleShowConfirm = async (id, name) => {
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
      }).then((response) => response.json()).then((data) => {
          return data;
        });
  
      if (usersData) {
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
  }

  const [ options, setOptions ] = useState({ year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }); 
  return (
    <main className="HommePageContainer">
      <div className="Content">
        <div className="MainTitleDivMain">
          <h1>International Workshop</h1>
        </div>
        <div className="MainTitleDiv">
          <h1>Data Driven Reaserch & Entrepreneurship</h1>
        </div>
        <div className="MainTitleDiv2">
          <h1>Day 3</h1>
        </div>
        <div className="DateDiv">
          <h1>{new Date().toLocaleDateString("fr-FR", options)}</h1>
        </div>
        <div className="TitleDiv">
          <h3>Inscrivez votre Présence en tappant votre nom ci-dessous</h3>
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
            <p>
              Cliquez sur le boutton &quot;Présent&quot; a droite de votre Nom
            </p>
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
          <img src="./bgrd/rename.png" />
        </div>
      </div>
    </main>
  );
}
