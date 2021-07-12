import React, { useEffect, useState } from "react";
import logOutIcon from "../Images/Logout_icon.jpg";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
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
  const db = firebase.firestore();

  // count total number of assigned users
  const [totalAssigned, setTotalAssigned] = useState(0);
  const assigned = () =>
    db
      .collection("testusers")
      .where("groupId", ">", 0)
      .get()
      .then((querySnapshot) => {
        setTotalAssigned(querySnapshot.size);
      });
  useEffect(() => {
    assigned();
  });

  // number of available users for grouping
  const [userCount, setUserCount] = useState(0);

  const countUnassigned = () => {
    db.collection("testusers")
      .where("groupId", "==", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserCount(querySnapshot.size);
        });
      });
  };
  useEffect(() => {
    countUnassigned();
  }, []);

  // data consist of score1, score2, username of all unassigned users
  const [data, setData] = useState([]);
  const getData = () => {
    let score1 = 0;
    let score2 = 0;
    let username = "";
    let id;
    let newData;
    db.collection("testusers")
      .where("groupId", "==", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          score1 = doc.data().score1;
          score2 = doc.data().score2;
          username = doc.data().username;
          id = doc.data().id;
          newData = {
            score1: score1,
            score2: score2,
            username: username,
            id: id
          };
          id++;
          setData((data) => [...data, newData]);
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  function kmeans2() {
    const numberOfUsers = userCount - (userCount % 4);
    data.splice(numberOfUsers);
    // desired number of clusters to be set for kmeans
    let group = Math.floor(userCount / 4);

    let centroids = [];
    // generate centroids randomly
    for (let i = 0; i < group; i++) {
      let score1 = Math.floor(Math.random() * 50 + 1);
      let score2 = Math.floor(Math.random() * 50 + 1);
      centroids.push({ score1: score1, score2: score2, size: 0, items: [] });
    }

    let distances = [];
    // calculate distance between all centroids and data points
    let distance;
    for (let i = 0; i < group; i++) {
      for (let j = 0; j < data.length; j++) {
        distance = Math.sqrt(
          (centroids[i].score1 - data[j].score1) *
            (centroids[i].score1 - data[j].score1) +
            (centroids[i].score2 - data[j].score2) *
              (centroids[i].score2 - data[j].score2)
        );
        distances.push({
          itemId: data[j].id,
          clusterId: i,
          distance: distance
        });
      }
    }
    // sort distances in ascending order
    distances.sort((a, b) => (a.distance > b.distance ? 1 : -1));

    let seen = [];
    // assign each item to a cluster until it is filled
    for (let i = 0; i < distances.length; i++) {
      if (
        centroids[distances[i].clusterId].size >= 4 ||
        seen.includes(distances[i].itemId)
      ) {
      } else {
        // add item to cluster
        centroids[distances[i].clusterId].items.push(distances[i].itemId);
        seen.push(distances[i].itemId);
        centroids[distances[i].clusterId].size++;
      }
    }

    // do recalculating of groups
    let count = 0;
    while (true) {
      if (count < 1000000) {
        if (recalculate() === true) {
          break;
        }
      } else {
        break;
      }
      count++;
    }

    function recalculate() {
      let newCentroids = [];
      // initialise new centroids with new mean values of data
      for (let i = 0; i < centroids.length; i++) {
        let accum1 = 0;
        let accum2 = 0;
        for (let j = 0; j < centroids[i].items.length; j++) {
          accum1 += data.find((x) => x.id === centroids[i].items[j]).score1;
          accum2 += data.find((x) => x.id === centroids[i].items[j]).score2;
        }
        newCentroids.push({
          score1: accum1 / centroids[i].items.length,
          score2: accum2 / centroids[i].items.length,
          size: 0,
          items: []
        });
        accum1 = 0;
        accum2 = 0;
      }

      let newDistances = [];
      // calculate distance between all centroids and data points
      let distance;
      for (let i = 0; i < group; i++) {
        for (let j = 0; j < data.length; j++) {
          distance = Math.sqrt(
            (newCentroids[i].score1 - data[j].score1) *
              (newCentroids[i].score1 - data[j].score1) +
              (newCentroids[i].score2 - data[j].score2) *
                (newCentroids[i].score2 - data[j].score2)
          );
          newDistances.push({
            itemId: data[j].id,
            clusterId: i,
            distance: distance
          });
        }
      }
      // sort distances in ascending order
      newDistances.sort((a, b) => (a.distance > b.distance ? 1 : -1));

      let seen = [];
      // assign each item to a cluster until it is filled
      for (let i = 0; i < newDistances.length; i++) {
        if (
          newCentroids[newDistances[i].clusterId].size >= 4 ||
          seen.includes(newDistances[i].itemId)
        ) {
        } else {
          // add item to cluster
          newCentroids[newDistances[i].clusterId].items.push(
            newDistances[i].itemId
          );
          seen.push(newDistances[i].itemId);
          newCentroids[newDistances[i].clusterId].size++;
        }
      }

      let different = true;
      // compare old and new centroid for difference
      for (let i = 0; i < centroids.length; i++) {
        for (let j = 0; j < centroids[i].items.length; j++) {
          if (newCentroids[i].items.includes(centroids[i].items[j])) {
          } else {
            different = false;
            break;
          }
        }
      }
      centroids = newCentroids;
      return different;
    }

    for (let i = 1; i < Math.floor(userCount / 4) + 1; i++) {
      db.collection("groups").doc(JSON.stringify(i)).set({ members: [] });
    }
    for (let i = 0; i < centroids.length; i++) {
      for (let j = 0; j < centroids[i].items.length; j++) {
        db.collection("testusers")
          .where("id", "==", centroids[i].items[j])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              db.collection("groups")
                .doc(JSON.stringify(i + Math.floor(totalAssigned / 4) + 1))
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

              db.collection("testusers")
                .doc(doc.id)
                .update({ groupId: i + Math.ceil(totalAssigned / 4) + 1 });
            });
          });
      }
    }

    db.collection("groups")
      .get()
      .then((querySnapshot) => {
        let x = querySnapshot.size;
        db.collection("testusers")
          .where("groupId","==",0)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // generate random number from groups
              Math.floor((Math.random() * x) + 1)
              db.collection("groups")
                .doc(JSON.stringify(x))
                .update({
                  members: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

              db.collection("testusers")
                .doc(doc.id)
                .update({ groupId: x });
            })
          })
      });
  }

  function reset() {
    db.collection("testusers")
      .where("groupId", ">", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("testusers").doc(doc.id).update({ groupId: 0 });
        });
      });
  }

  async function MakeAnnouncement() {
    try {
      history.push("./MakeAnnouncement");
    } catch {}
  }

  async function ReadFeedback() {
    try {
      history.push("./Feedback");
    } catch {}
  }

  return (
    <>
      <Card style={{ backgroundColor: "lightblue" }}>
        <Card.Body>
          <Form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ height: "5vh" }}>
                <h1 style={{ fontFamily: "Bradley Hand, cursive" }}>
                  FriendsZone
                  <Button
                    variant="link"
                    onClick={handleLogout}
                    style={{ float: "right" }}
                  >
                    <img
                      src={logOutIcon}
                      alt="Picnic"
                      width="50px"
                      height="50px"
                    />
                  </Button>
                </h1>
              </div>

              <div
                style={{
                  display: "flex",
                  height: "95vh",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    margin: "auto",
                    backgroundColor: "lightgrey",
                    width: "70vw",
                    height: "75vh",
                    padding: 100,
                    borderRadius: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 25
                  }}
                >
                  <p>Current unassigned users: {userCount}</p>
                  <p>Groups to be generated: {Math.floor(userCount / 4)}</p>
                  <Button
                    onClick={kmeans2}
                    style={{
                      backgroundColor: "blue",
                      borderRadius: 20,
                      width: "10vw",
                      height: "5vh"
                    }}
                  >
                    Create Group
                  </Button>
                  <Button
                    onClick={reset}
                    style={{
                      backgroundColor: "red",
                      borderRadius: 20,
                      width: "10vw",
                      height: "5vh"
                    }}
                  >
                    Reset groups
                  </Button>
                  <Button
                    onClick={MakeAnnouncement}
                    style={{
                      backgroundColor: "blue",
                      borderRadius: 20,
                      width: "10vw",
                      height: "5vh"
                    }}
                  >
                    Make Announcement
                  </Button>
                  <Button
                    onClick={ReadFeedback}
                    style={{
                      backgroundColor: "blue",
                      borderRadius: 20,
                      width: "10vw",
                      height: "5vh"
                    }}
                  >
                    Feedbacks
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
