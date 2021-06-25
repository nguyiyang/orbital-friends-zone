import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
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
  const db = firebase.firestore();

  // count total number of users
  const [totalUsers, setTotalUsers] = useState(0);
  const display = () =>
    db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        setTotalUsers(querySnapshot.size - 1);
      });
  useEffect(() => {
    display();
  });

  // count total number of assigned users
  const [totalAssigned, setTotalAssigned] = useState(0);
  const assigned = () =>
    db
      .collection("users")
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
    db.collection("users")
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
    db.collection("users")
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
            id: id,
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
    console.log(data);
    // desired number of clusters to be set for kmeans
    let group = Math.floor(userCount / 4);
    console.log(group);

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
          distance: distance,
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
    console.log(distances);
    console.log(centroids[0]);

    // do recalculating of groups
    let count = 0;
    while (true) {
      if (count < 1000) {
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
          items: [],
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
            distance: distance,
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

    for (let i = 0; i < centroids.length; i++) {
      for (let j = 0; j < centroids[i].items.length; j++) {
        db.collection("users")
          .where("id", "==", centroids[i].items[j])
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(totalAssigned);
              db.collection("users")
                .doc(doc.id)
                .update({ groupId: i + Math.ceil(totalAssigned / 4) + 1 });
            });
          });
      }
    }
  }

  function reset() {
    db.collection("users")
      .where("groupId", ">", 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({ groupId: 0 });
        });
      });
  }

  return (
    <div>
      <div>
        <div style={{ height: 50 }}></div>
        <h2 style={{ fontSize: 50, fontFamily: "Bradley Hand, cursive" }}>
          {" "}
          FriendsZone
        </h2>
        <Card style={{ background: 0.1 }}>
          <h1>Total Assigned users: {totalAssigned}</h1>
          <h1>Total unassigned users: {userCount}</h1>

          <button type="submit" onClick={kmeans2}>
            Create groups *NEW*
          </button>
          <button type="submit" onClick={reset}>
            Reset group assigned
          </button>
          <Card.Body>
            <Form onSubmit={handleLogout}>
              <h1>Total users: {totalUsers}</h1>
              <Button
                type="submit"
                style={{ backgroundColor: "purple", borderRadius: 20 }}
              >
                Log out
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
