import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 11566,
    name: "Mazen",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 11576,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=118877",
    balance: 30,
  },
  {
    id: 11596,
    name: "Khaled",
    image: "https://i.pravatar.cc/48?u=118837",
    balance: 0,
  },
];

// Button function for all app

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {" "}
      {children}{" "}
    </button>
  );
}

// function App contain all function element
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  // handled func which sets data
  function handelShowAddFfriend() {
    setShowAddFriend((show) => !show);
  }
  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handelSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  function handelSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <div>
          <h1 className="top-head"> Count Bill </h1>
        </div>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handelSelection}
        />

        {showAddFriend && <FormaAddFriend onAddFriend={handelAddFriend} />}
        <Button onClick={handelShowAddFfriend} className="add-close">
          {" "}
          {showAddFriend ? "Close" : "Add Friend"}{" "}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handelSplitBill}
        />
      )}
    </div>
  );
}

// displayed friends and map it

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul className="parent-list">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li
      className={isSelected ? "list-of-friends selected" : "list-of-friends "}
    >
      <div className="friend-data">
        <img src={friend.image} alt={friend.nname} />
        <h3>{friend.name}</h3>

        <Button onClick={() => onSelection(friend)}>
          {" "}
          {!isSelected ? "select" : "close"}
        </Button>
      </div>
      <div className="friend-owe">
        {friend.balance < 0 && (
          <span className="red">
            you owe {friend.name} {Math.abs(friend.balance)}$
          </span>
        )}
        {friend.balance > 0 && (
          <span className="green">
            {friend.name} owes you {Math.abs(friend.balance)}$
          </span>
        )}
        {friend.balance === 0 && <span>you and {friend.name} are even </span>}
      </div>
    </li>
  );
}

// form add friend to list

function FormaAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handelSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form onSubmit={handelSubmit}>
      <label> Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <label> Image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <Button> Add </Button>
    </form>
  );
}
// displayed form split bill with selected friend

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handelSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form onSubmit={handelSubmit}>
      <div className="split-form-bill">
        <h2> split a bill with {selectedFriend.name} </h2>
        <div>
          <label> bill value </label>
          <input
            type="text"
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
        </div>
        <div>
          <label> your expense </label>
          <input
            type="text"
            value={paidByUser}
            onChange={(e) =>
              setPaidByUser(
                Number(e.target.value) > bill
                  ? paidByUser
                  : Number(e.target.value)
              )
            }
          />
        </div>
        <div>
          <label> {selectedFriend.name}'s exoense </label>
          <input type="text" disabled value={paidByFriend} />
        </div>
        <div>
          <label> who is paying the bill </label>
          <select
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user"> you</option>
            <option value="friend">{selectedFriend.name}</option>
          </select>
        </div>
      </div>
      <Button> split bill </Button>
    </form>
  );
}
