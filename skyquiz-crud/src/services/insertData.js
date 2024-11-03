// InsertData.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { where,query,getDocs,deleteDoc } from "firebase/firestore";

const jsonData =[
  {
      "question": "Which statement about checklist overrides is correct?",
      "options": [
          "To override a checklist you must display that checklist and then use the CHKL OVRD key.",
          "Closed loop steps cannot be overridden.",
          "Steps that are overridden remain white.",
          "To override a checklist it must first be reset."
      ],
      "correctAnswer": 0,
      "explanation": "The correct answer is 'To override a checklist you must display that checklist and then use the CHKL OVRD key.' This statement explains the correct procedure for overriding a checklist.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What does the CHKL OVRD key do when selected?",
      "options": [
          "Overrides the highlighted item on the checklists.",
          "Overrides the displayed checklist and displays the next checklist to be overridden.",
          "Displays the next checklist to be overridden.",
          "Displays the last overridden checklist."
      ],
      "correctAnswer": 1,
      "explanation": "When the CHKL OVRD key is selected, it overrides the currently displayed checklist and shows the next checklist that needs to be overridden.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "When using the Display Select Panel, what are the steps to select the status page on the left inboard display unit?",
      "options": [
          "Select R INBD switch, then select STAT switch.",
          "Select LWR CTR switch, then select STAT switch.",
          "Select L INBD switch, then select STAT switch.",
          "Select L INBD switch, then select ENG switch."
      ],
      "correctAnswer": 2,
      "explanation": "To select the status page on the left inboard display unit, the correct steps are to first select the L INBD switch and then select the STAT switch.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What Display Select Panel steps displays the flight control synoptic on the right inboard display unit?",
      "options": [
          "Select the R INBD switch, then select the FCTL switch.",
          "Select the FCTL switch, then select the R INBD switch.",
          "Select the L INBD switch, then select the FCTL switch.",
          "Select the R INBD switch, then select the CONT switch."
      ],
      "correctAnswer": 0,
      "explanation": "To display the flight control synoptic on the right inboard display unit, the correct steps are to first select the R INBD switch and then select the FCTL switch.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "When the inboard display selector is in the EICAS position, which switches on the Display Select Panel affect that inboard display?",
      "options": [
          "All display select panel operations are normal.",
          "Inboard display unit can only display EICAS or the secondary engine display.",
          "All display switches are inoperative except ENG, FUEL, and AIR.",
          "Any display select panel selection will be displayed on the lower center display unit."
      ],
      "correctAnswer": 2,
      "explanation": "When the inboard display selector is in the EICAS position, all display switches on the Display Select Panel become inoperative except for ENG, FUEL, and AIR.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "Which statement about the Integrated Standby Flight Display (ISFD) is most correct?",
      "options": [
          "It displays airplane attitude, airspeed and ILS information.",
          "It displays airplane attitude, heading and airspeed information.",
          "It displays airplane attitude, altitude and ILS information.",
          "It displays airplane attitude, airspeed, altitude, heading and ILS information."
      ],
      "correctAnswer": 3,
      "explanation": "The ISFD displays airplane attitude, airspeed, altitude, heading, and ILS information, providing a comprehensive view of crucial flight data.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What does the EICAS Message SGL SOURCE DISPLAYS indicate?",
      "options": [
          "Both PFDs are using the same source for radio altitude display.",
          "Both PFDs are receiving air data from the same single channel source.",
          "Both PFDs are using the same source for flight director information.",
          "A single source of display information is used by some or all display units."
      ],
      "correctAnswer": 3,
      "explanation": "The EICAS Message SGL SOURCE DISPLAYS indicates that a single source of display information is used by some or all display units, affecting consistency across displays.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What does the EICAS Message SGL SOURCE AIR DATA indicate?",
      "options": [
          "Both AIR DATA/ATTITUDE source switches are in the ALTN position.",
          "Both PFDs are receiving air data from the same single channel source.",
          "Both PFDs are using the same source for flight director information.",
          "A single source of display information is used by some or all display units."
      ],
      "correctAnswer": 1,
      "explanation": "The EICAS Message SGL SOURCE AIR DATA indicates that both PFDs are receiving air data from the same single channel source, ensuring consistent data display.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What does the EICAS Message DISPLAY SELECT PNL indicate?",
      "options": [
          "Left, center or right CDU control of the Display Control Panel is active.",
          "The Display Control Panel is in use.",
          "Both PFDs are using the same source of air data information.",
          "A single source of display information is used by some or all display units."
      ],
      "correctAnswer": 0,
      "explanation": "The EICAS Message DISPLAY SELECT PNL indicates that either the left, center, or right CDU control of the Display Control Panel is active.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "What does the EICAS Message BARO SET DISAGREE indicate?",
      "options": [
          "The standby altimeter barometric setting does not agree with the Captain's PFD barometric setting.",
          "A PFD barometric setting remains in the QNH mode above the transition altitude.",
          "The captain's and the first officer's barometric settings disagree.",
          "Both PFDs are using STD but the preselected barometric settings disagree."
      ],
      "correctAnswer": 2,
      "explanation": "The BARO SET DISAGREE message indicates that the barometric settings of both the captain and the first officer do not agree, which can lead to confusion in altitude readings.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "Which statement is not correct about the Radio Altitude display on the PFD?",
      "options": [
          "Displays radio altitude below 2500 feet AGL.",
          "Turns amber when below radio altitude minimums.",
          "The display box is highlighted in white for 10 seconds when passing below 1000 feet.",
          "Indicates current ADIRS altitude below 2500 feet."
      ],
      "correctAnswer": 3,
      "explanation": "The statement 'Indicates current ADIRS altitude below 2500 feet' is not correct. The Radio Altitude display specifically shows height above ground level (AGL) and not the ADIRS altitude.",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
      "question": "Which statement is true about the Glideslope Pointer and scale on the PFD?",
      "options": [
          "Indicates glideslope position relative to the airplane.",
          "Fills in solid when the glideslope is captured.",
          "Is in view when the glideslope signal is received.",
          "The scale is in view after the frequency is tuned and identified."
      ],
      "correctAnswer": 0,
      "explanation": "The Glideslope Pointer and scale on the PFD indicate the position of the glideslope",
      "isFlashCard": true,
      "level": "Medium",
      "system": "Flight Instruments, Displays",
      "aircraftType": "B777"
  },
  {
    "question": "Which statement about checklist overrides is correct?",
    "options": [
        "A. To override a checklist you must display that checklist and then use the CHKL OVRD key.",
        "B. Closed loop steps cannot be overridden.",
        "C. Steps that are overridden remain white.",
        "D. To override a checklist it must first be reset."
    ],
    "correctAnswer": 0,
    "explanation": "The correct answer is 'To override a checklist you must display that checklist and then use the CHKL OVRD key.' This statement explains the correct procedure for overriding a checklist. It states that in order to override a checklist, you need to first display the checklist and then use the CHKL OVRD key.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "Checklists",
    "aircraftType": "B777"
},
{
    "question": "What does the CHKL OVRD key do when selected?",
    "options": [
        "A. Overrides the highlighted item on the checklists.",
        "B. Overrides the displayed checklist and displays the next checklist to be overridden.",
        "C. Displays the next checklist to be overridden.",
        "D. Displays the last overridden checklist."
    ],
    "correctAnswer": 1,
    "explanation": "When the CHKL OVRD key is selected, it overrides the currently displayed checklist and shows the next checklist that needs to be overridden. This means that it allows the user to skip the current checklist and move on to the next one that requires attention or action.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "Checklists",
    "aircraftType": "B777"
},
{
    "question": "When using the Display Select Panel, what are the steps to select the status page on the left inboard display unit?",
    "options": [
        "A. Select R INBD switch, then select STAT switch.",
        "B. Select LWR CTR switch, then select STAT switch.",
        "C. Select L INBD switch, then select STAT switch.",
        "D. Select L INBD switch, then select ENG switch."
    ],
    "correctAnswer": 2,
    "explanation": "To select the status page on the left inboard display unit using the Display Select Panel, the correct steps are to first select the L INBD switch and then select the STAT switch. This combination of switches will allow the user to access the desired status page on the left inboard display unit.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "Display Select Panel",
    "aircraftType": "B777"
},
{
    "question": "What Display Select Panel steps displays the flight control synoptic on the right inboard display unit?",
    "options": [
        "A. Select the R INBD switch, then select the FCTL switch.",
        "B. Select the FCTL switch, then select the R INBD switch.",
        "C. Select the L INBD switch, then select the FCTL switch.",
        "D. Select the R INBD switch, then select the CONT switch."
    ],
    "correctAnswer": 0,
    "explanation": "To display the flight control synoptic on the right inboard display unit, the correct steps are to first select the R INBD switch and then select the FCTL switch. This sequence of selections will activate the necessary settings and configurations to show the flight control synoptic on the specified display unit.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "Display Select Panel",
    "aircraftType": "B777"
},
{
    "question": "When the inboard display selector is in the EICAS position, which switches on the Display Select Panel affect that inboard display?",
    "options": [
        "A. All display select panel operations are normal.",
        "B. Inboard display unit can only display EICAS or the secondary engine display.",
        "C. All display switches are inoperative except ENG, FUEL and AIR.",
        "D. Any display select panel selection will be displayed on the lower center display unit."
    ],
    "correctAnswer": 2,
    "explanation": "When the inboard display selector is in the EICAS position, all display switches on the Display Select Panel become inoperative except for ENG, FUEL, and AIR. This means that only the engine, fuel, and air-related information will be displayed on the inboard display unit. Other display select panel selections will not have any effect on the inboard display.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "EICAS",
    "aircraftType": "B777"
},
{
    "question": "Which statement about the Integrated Standby Flight Display (ISFD) is most correct?",
    "options": [
        "A. It displays airplane attitude, airspeed and ILS information.",
        "B. It displays airplane attitude, heading and airspeed information.",
        "C. It displays airplane attitude, altitude and ILS information.",
        "D. It displays airplane attitude, airspeed, altitude, heading and ILS information."
    ],
    "correctAnswer": 3,
    "explanation": "The correct answer is that the Integrated Standby Flight Display (ISFD) displays airplane attitude, airspeed, altitude, heading, and ILS information. This means that the ISFD provides a comprehensive display of crucial flight information, including the aircraft's pitch, roll, and yaw (attitude), its speed through the air (airspeed), its height above sea level (altitude), its direction of travel (heading), and information related to the Instrument Landing System (ILS), which helps guide the aircraft during approaches and landings.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "Flight Instruments",
    "aircraftType": "B777"
},
{
    "question": "What does the EICAS Message SGL SOURCE DISPLAYS indicate?",
    "options": [
        "A. Both PFDs are using the same source for radio altitude display.",
        "B. Both PFDs are receiving air data from the same single channel source.",
        "C. Both PFDs are using the same source for flight director information.",
        "D. A single source of display information is used by some or all display units."
    ],
    "correctAnswer": 3,
    "explanation": "The correct answer suggests that the EICAS Message SGL SOURCE DISPLAYS indicates that a single source of display information is used by some or all display units. This means that the information displayed on multiple units, such as the PFDs and flight director, is sourced from a single channel or system. This message is likely to inform the pilots that the displayed information may be affected if there is an issue with the single source.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "EICAS",
    "aircraftType": "B777"
},
{
    "question": "What does the EICAS Message SGL SOURCE AIR DATA indicate?",
    "options": [
        "A. Both AIR DATA/ATTITUDE source switches are in the ALTN position.",
        "B. Both PFDs are receiving air data from the same single channel source.",
        "C. Both PFDs are using the same source for flight director information.",
        "D. A single source of display information is used by some or all display units."
    ],
    "correctAnswer": 1,
    "explanation": "The EICAS Message SGL SOURCE AIR DATA indicates that both Primary Flight Displays (PFDs) are receiving air data from the same single channel source. This means that both PFDs are using the same source of air data information, ensuring consistency and accuracy in the displayed information on both displays.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "EICAS",
    "aircraftType": "B777"
},
{
    "question": "What does the EICAS Message DISPLAY SELECT PNL indicate?",
    "options": [
        "A. Left, center or right CDU control of the Display Control Panel is active.",
        "B. The Display Control Panel is in use.",
        "C. Both PFDs are using the same source of air data information.",
        "D. A single source of display information is used by some or all display units."
    ],
    "correctAnswer": 0,
    "explanation": "The EICAS Message DISPLAY SELECT PNL indicates that either the left, center, or right CDU control of the Display Control Panel is active. This means that one of the CDUs is currently being used to control the Display Control Panel, allowing for the selection and management of various display units.",
    "isFlashCard": true,
    "level": "Intermediate",
    "system": "EICAS",
    "aircraftType": "B777"
},
{
  "question": "What does the EICAS Message BARO SET DISAGREE indicate?",
  "options": [
      "A. The standby altimeter barometric setting does not agree with the Captain's PFD barometric setting.",
      "B. A PFD barometric setting remains in the QNH mode above the transition altitude.",
      "C. The captains and the first officers barometric settings disagree.",
      "D. Both PFDs are using STD but the preselected barometric setting is not synchronized."
  ],
  "correctAnswer": 3,
  "explanation": "The EICAS Message BARO SET DISAGREE indicates that both PFDs are using the standard pressure setting (STD), but the preselected barometric settings are not synchronized. This means that there is a disagreement between the altimeter settings, which could affect altitude readings and situational awareness for the flight crew.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "EICAS",
  "aircraftType": "B777"
},
{
  "question": "Which statement correctly describes the functions of the Captain's and First Officer's displays in the event of a display failure?",
  "options": [
      "A. The displays will continue to operate independently, showing different sources.",
      "B. The displays will revert to standby mode with limited information.",
      "C. The Captain's display will take priority and will show only Captain's data.",
      "D. The First Officer's display will show the data from the Captain's source."
  ],
  "correctAnswer": 3,
  "explanation": "In the event of a display failure, the First Officer's display will take the data from the Captain's source. This redundancy helps to ensure that critical flight information remains available, providing the pilots with necessary data despite a failure in one of the displays.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "Flight Instruments",
  "aircraftType": "B777"
},
{
  "question": "What information is displayed on the Primary Flight Display (PFD)?",
  "options": [
      "A. Only attitude and altitude information.",
      "B. Flight path vector, airspeed, altitude, and attitude information.",
      "C. Engine parameters and fuel management data.",
      "D. Navigation information and weather radar data."
  ],
  "correctAnswer": 1,
  "explanation": "The Primary Flight Display (PFD) shows critical flight information including the flight path vector, airspeed, altitude, and aircraft attitude. This comprehensive display provides the pilots with essential data required for safe flight operations.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "Flight Instruments",
  "aircraftType": "B777"
},
{
  "question": "What does the EICAS Message ENG OUT indicate?",
  "options": [
      "A. One of the engines has shut down or is not producing thrust.",
      "B. Both engines are operating at reduced power.",
      "C. Engine start cycle has been initiated.",
      "D. The APU is supplying bleed air to the engines."
  ],
  "correctAnswer": 0,
  "explanation": "The EICAS Message ENG OUT indicates that one of the engines has shut down or is not producing thrust. This message alerts the flight crew to a potential engine failure, necessitating immediate assessment and response.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "Engines",
  "aircraftType": "B777"
},
{
  "question": "What does the EICAS Message ROLL SPOILERS indicate?",
  "options": [
      "A. The roll spoilers are deployed.",
      "B. The roll spoilers are not responding.",
      "C. The roll spoilers are in the stowed position.",
      "D. Roll spoilers are only active on one wing."
  ],
  "correctAnswer": 0,
  "explanation": "The EICAS Message ROLL SPOILERS indicates that the roll spoilers are deployed. This message is important for the flight crew to understand that additional lift and drag is being created on one wing, which can affect the aircraft's handling characteristics.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "Flight Control",
  "aircraftType": "B777"
},
{
  "question": "What are the functions of the autopilot during normal operations?",
  "options": [
      "A. To assist the pilot in maintaining altitude and heading.",
      "B. To control engine thrust during takeoff and landing.",
      "C. To navigate the aircraft autonomously to the destination.",
      "D. To provide flight data to the co-pilot only."
  ],
  "correctAnswer": 0,
  "explanation": "During normal operations, the autopilot assists the pilot in maintaining altitude and heading. This helps reduce pilot workload, particularly during long flights, by automating routine flight tasks.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "Autopilot",
  "aircraftType": "B777"
},
{
  "question": "What is the primary purpose of the EICAS system?",
  "options": [
      "A. To provide navigation information to the pilots.",
      "B. To display engine parameters and alerts to the flight crew.",
      "C. To automate the control of flight systems.",
      "D. To manage fuel distribution and consumption."
  ],
  "correctAnswer": 1,
  "explanation": "The primary purpose of the EICAS (Engine Indication and Crew Alerting System) is to display engine parameters and alerts to the flight crew. This system provides essential data on the status and performance of the engines, as well as warnings for any abnormal conditions.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "EICAS",
  "aircraftType": "B777"
},
{
  "question": "What does the EICAS Message APU OIL TEMP indicate?",
  "options": [
      "A. The APU oil temperature is within normal limits.",
      "B. The APU oil temperature is above normal limits.",
      "C. The APU is not operational due to high oil temperature.",
      "D. The APU requires maintenance due to oil temperature issues."
  ],
  "correctAnswer": 1,
  "explanation": "The EICAS Message APU OIL TEMP indicates that the APU oil temperature is above normal limits. This alert requires the flight crew to assess the situation, as prolonged exposure to high oil temperatures can damage the APU.",
  "isFlashCard": true,
  "level": "Intermediate",
  "system": "APU",
  "aircraftType": "B777"
}
]








;


const insertData = async () => {
  const collectionRef = collection(db, "questions");
  for (const item of jsonData) {
    await addDoc(collectionRef, item);
  }
  console.log("Data inserted successfully!");
};
const deleteData = async () => {
    const collectionRef = collection(db, "questions");
    const q = query(collectionRef, where("system", "==", "Air Systems"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("Documents with system 'Air Systems' deleted successfully!");
  };
export default insertData;

