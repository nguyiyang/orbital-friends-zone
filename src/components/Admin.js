import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

export default function Admin() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {}
  }
  const uid = firebase.auth().currentUser?.uid;
  const db = firebase.firestore();

  // count total number of assigned users
  const [totalAssigned, setTotalAssigned] = useState(0);
  db.collection("users")
    .where("groupAssigned", "==", true)
    .get()
    .then((querySnapshot) => {
      setTotalAssigned(querySnapshot.size);
    });

  // number of available users for grouping
  const [userCount, setUserCount] = useState(0);


  const [currentGroup, setCurrentGroup] = useState(
    Math.ceil(totalAssigned / 4)
  );

  function kmeans() {

    let count = 0;
    db.collection("users")
      .where("groupAssigned", "==", false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (count === 0) {
            db.collection("groups")
              .doc((currentGroup + 1).toString())
              .set({ firstUser: doc.data().username }, { merge: true });
            count++;
          } else if (count === 1) {
            db.collection("groups")
              .doc((currentGroup + 1).toString())
              .set({ secondUser: doc.data().username }, { merge: true });
            count++;
          } else if (count === 2) {
            db.collection("groups")
              .doc((currentGroup + 1).toString())
              .set({ thirdUser: doc.data().username }, { merge: true });
            count++;
          } else if (count === 3) {
            db.collection("groups")
              .doc((currentGroup + 1).toString())
              .set({ fourthUser: doc.data().username }, { merge: true });
            count = 0;
            setCurrentGroup(currentGroup + 1);
          } 
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
  // count total number of users
  const [totalUsers, setTotalUsers] = useState(0);
  const display = () =>
    db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        setTotalUsers(querySnapshot.size);
      });
  useEffect(() => {
    display();
  });

  return (
    <>
      <h1>Total users: {totalUsers}</h1>
      <h1>Total Assigned users: {totalAssigned}</h1>
      <h1>Total unassigned users: {userCount}</h1>
      <button className="w-100" type="submit" onClick={kmeans}>
        Create groups
      </button>
      <div>
        <Button variant="link" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
}
